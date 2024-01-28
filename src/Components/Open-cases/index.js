import React, { Component } from 'react'
import { connect } from 'react-redux'

import CaseList from '../UI-helper-components/Case-list'
import LoaderButton from '../UI-helper-components/Loader-button'
import openCasesApi from '../../Api/open-cases'

class OpenCases extends Component {

  state = {
    caseList: [],
    casesLoaded: false,
    isSpinnerOn: false,
    isFullScreenLoaderOn: false,
    isButtonLoaderOn: false
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

  componentDidMount () {
    this.toggleSpinner()
    openCasesApi(this.props.state.authReducer.token)
      .then(res => {
        this.toggleSpinner()
        this.setState(() => {
          return {
            caseList: res.data.openCases,
            casesLoaded: true
          }
        })
      })
      .catch(err => {
        this.toggleSpinner()
        alert('Error. Please retry')
      })
  }

  loaderButtonClickHandler = async (e) => {
    e.preventDefault()
    this.setState(() => ({
      isButtonLoaderOn: true
    }))
    try {
      const res = await openCasesApi(this.props.state.authReducer.token)
      this.setState((prevState) => {
        if(prevState.caseList !== res.data.openCases){
          return {
            isButtonLoaderOn: false,
            caseList: res.data.openCases
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

  render () {
    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-12 list-page-heading-wrapper">
            <h2 className='page-heading'>Open cases</h2>
            <LoaderButton
              clickHandler={this.loaderButtonClickHandler}
              isLoading={this.state.isButtonLoaderOn}
            />
          </div>
        </div>
        {this.state.isFullScreenLoaderOn && <div className='tibot-full-screen-loader'></div>} 
        {this.state.isSpinnerOn && <div className='square-spinner'></div>}
        <CaseList
        {...this.props}
        toggleFullScreenLoader={this.toggleFullScreenLoader}
        caseList={this.state.caseList}
        origin='openCases'
        casesLoaded={this.state.casesLoaded} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(OpenCases)
