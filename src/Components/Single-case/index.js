import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CaseDetails from './Case-details'
import DoctorDiagnosisUI from './Doctor-diagnosis-ui'
import DoctorDiagnosisUIDisabled from './Doctor-diagnosis-ui-disabled'

class SingleCase extends Component {

  state = {
    pending: true,
    caseDetails: {}
  }

  singleCaseRootChangeHandler = (newState) => {
    this.setState(() => newState)
  }

  render () {
    return (
      <div className='container single-case-wrapper'>
        <div className='row'>
          <div className='col-md-6'>
            <CaseDetails
              singleCaseRootChangeHandler={this.singleCaseRootChangeHandler}
              {...this.props}
            />
          </div>
          <div className='col-md-6'>
            {this.state.pending? <DoctorDiagnosisUI {...this.props} /> :
              <DoctorDiagnosisUIDisabled
                caseDetails={this.state.caseDetails}
              />  
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SingleCase)
