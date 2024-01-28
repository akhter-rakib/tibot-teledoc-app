import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import completeCasesApi from '../../Api/Complete-cases'
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

  completedCasesSort = (a, b) => {
    const result = moment(b.date).valueOf() - moment(a.date).valueOf()
    return result
  }

  loaderButtonClickHandler = async (e) => {
    e.preventDefault()
    this.setState(() => ({
      isButtonLoaderOn: true
    }))
    try {
      const res = await completeCasesApi(this.props.state.authReducer.token)
      this.setState((prevState) => {
        if(prevState.caseList !== res.data.openCases){
          const completedCasesSortedByDate = res.data.completeCases.sort(this.completedCasesSort)
          return {
            isButtonLoaderOn: false,
            caseList: completedCasesSortedByDate
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
    completeCasesApi(this.props.state.authReducer.token)
    .then(res => {
      const completedCasesSortedByDate = res.data.completeCases.sort(this.completedCasesSort)
      this.setState(() => {
        return {
          caseList: completedCasesSortedByDate,
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
    completeCasesApi(this.props.state.authReducer.token)
      .then(res => {
        const completedCasesSortedByDate = res.data.completeCases.sort(this.completedCasesSort)
        this.toggleSpinner()
        this.setState(() => {
          return {
            caseList: completedCasesSortedByDate,
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
            <h2 className='page-heading'>Completed cases</h2>
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
        listType='completedCases'
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
