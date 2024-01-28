import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoaderButton from '../UI-helper-components/Loader-button'
import pendingCasesApi from '../../Api/pending-cases'
import completeCasesApi from '../../Api/Complete-cases'
import MessageList from './Message-list'

class Messages extends Component {

  state = {
    isSpinnerOn: false,
    messageHeadingsLoaded: false,
    messageHeadings: [],
    isButtonLoaderOn: false
  }

  toggleSpinner = () => {
    this.setState(() => ({ isSpinnerOn: !this.state.isSpinnerOn }))
  }

  
  getMessageHeadings = () => {
    return this.state.messageHeadings.slice().filter(item => item.isDoctorUnread === true).reverse()
  }
  
  shouldShowNoMessages = () => {
    return this.state.messageHeadingsLoaded && this.getMessageHeadings().length < 1
  }

  componentDidMount () {
    this.toggleSpinner()
    pendingCasesApi(this.props.state.authReducer.token)
      .then(res => {
        const pendingCases = res.data.pendingCases || []
        completeCasesApi(this.props.state.authReducer.token)
          .then(response => {
            const completeCases = response.data.completeCases || []
            this.setState(() => ({ 
              messageHeadings: [...pendingCases, ...completeCases].sort(),
              messageHeadingsLoaded: true
            }))
            this.toggleSpinner()
          })
      })
      .catch(err => {
        this.toggleSpinner()
      })
  }

  loaderButtonClickHandler = async (e) => {
    e.preventDefault()
    this.setState(() => ({
      isButtonLoaderOn: true
    }))
    try {
      const pendingCases = await pendingCasesApi(this.props.state.authReducer.token)
      const completeCases = await completeCasesApi(this.props.state.authReducer.token)
      this.setState((prevState) => {
        return {
          isButtonLoaderOn: false,
          messageHeadings: [...pendingCases.data.pendingCases, ...completeCases.data.completeCases]
        }
      })
    } catch (error) {
      this.setState(() => ({
        isButtonLoaderOn: false
      }))
      alert('Error. Please retry.')
    }
  }

  render () {
    return (
      <div className='container'>
      <div className="row">
          <div className="col-md-12 list-page-heading-wrapper">
            <h2 className='page-heading'>Messages</h2>
            <LoaderButton
              clickHandler={this.loaderButtonClickHandler}
              isLoading={this.state.isButtonLoaderOn}
            />
          </div>
        </div>
        {this.state.isSpinnerOn && <div className='square-spinner'></div>}
        {this.shouldShowNoMessages() ? <div className='no-list-item'>No messages</div> : 
          <MessageList
            {...this.props}
            messageHeadings={this.getMessageHeadings()}
          />        
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(Messages)
