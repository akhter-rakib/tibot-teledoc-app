import React, { Component } from 'react'
import { connect } from 'react-redux'

import pendingCasesApi from '../../Api/pending-cases'
import LoaderButton from '../UI-helper-components/Loader-button'
import CaseList from '../UI-helper-components/Case-list'

class PendingCases extends Component {

  state = {
    caseList: [],
    casesLoaded: false,
    isSpinnerOn: false,
    isFullScreenLoaderOn: false,
    isButtonLoaderOn: false
  }

  loaderButtonClickHandler = async (e) => {
    e.preventDefault()
    this.setState(() => ({
      isButtonLoaderOn: true
    }))
    try {
      const res = await pendingCasesApi(this.props.state.authReducer.token)
      this.setState((prevState) => {
        if(prevState.caseList !== res.data.openCases){
          return {
            isButtonLoaderOn: false,
            caseList: res.data.pendingCases
          }
        }
      })
    } catch (error) {
      this.setState(() => ({
        isButtonLoaderOn: false
      }))
      alert('Error. Please retry.')
    }
  }

  toggleSpinner = () => {
    this.setState(({isSpinnerOn}) => {
      return {
        isSpinnerOn: !isSpinnerOn
      }
    })
  }

  toggleFullScreenLoader = () => {
    this.setState(({isFullScreenLoaderOn}) => ({
      isFullScreenLoaderOn: !isFullScreenLoaderOn
    }))
  }

  reloadCases = () => {
    this.setState(() => ({
      caseList: []
    }))
    pendingCasesApi(this.props.state.authReducer.token)
    .then(res => {
      this.setState(() => {
        return {
          caseList: res.data.pendingCases,
          casesLoaded: true
        }
      })
    })
    .catch(err => {
      console.log(err)
    }) 
  }

  componentDidMount () {
    this.toggleSpinner()
    pendingCasesApi(this.props.state.authReducer.token)
      .then(res => {
        this.toggleSpinner()
        this.setState(() => {
          return {
            caseList: res.data.pendingCases,
            casesLoaded: true
          }
        })
      })
      .catch(err => {
        console.log(err)
        this.toggleSpinner()
      }) 
  }

  render () {
    return (
      <div className='container'>
      <div className="row">
          <div className="col-md-12 list-page-heading-wrapper">
            <h2 className='page-heading'>Pending cases</h2>
            <LoaderButton
              clickHandler={this.loaderButtonClickHandler}
              isLoading={this.state.isButtonLoaderOn}
            />
          </div>
        </div>
        {this.state.isFullScreenLoaderOn && <div className='tibot-full-screen-loader'></div>} 
        {this.state.isSpinnerOn && <div className='square-spinner'></div>}
        <CaseList
        caseList={this.state.caseList}
        origin='pendingCases'
        casesLoaded={this.state.casesLoaded}
        reloadCases={this.reloadCases}
        toggleFullScreenLoader={this.toggleFullScreenLoader}
        {...this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(PendingCases)
