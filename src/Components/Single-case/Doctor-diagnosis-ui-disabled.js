import React, { Component } from 'react'
import { get } from 'lodash'
import Message from './Message'

class DoctorDiagnosisDisabled extends Component {

  getDoctorsDiagnosis = () => {
    return get(this, 'props.caseDetails.doctorReport.doctorsDiagnosis')
  }

  getDiseaseDescription = () => {
    return get(this, 'props.caseDetails.doctorReport.diseaseDescription')
  }

  getMedication = () => {
    return get(this, 'props.caseDetails.doctorReport.medication')
  }

  getDoctorsNote = () => {
    return get(this, 'props.caseDetails.doctorReport.note')
  }

  getFollowUpIn = () => {
    return get(this, 'props.caseDetails.doctorReport.followUp')
  }

  render () {
    return (
      <div>
        <div className='d-md-none doctor-response-form'>Doctor's response form</div>
        <form>

          <div>
            <div className='form-group'>
              <label><strong>Select disease</strong>:</label>
              <input disabled type='text' className='form-control' value={this.getDoctorsDiagnosis()} />
            </div>
          </div>

          <div className='form-group'>
            <label><strong>Disease description</strong>:</label>
            <textarea value={this.getDiseaseDescription()} disabled required className='form-control' rows='5' />
          </div>

          <div className='form-group'>
            <label><strong>Advice</strong>:</label>
            <textarea disabled rows='5' className='form-control' value={this.getMedication()} />
          </div>

          <div className='form-group'>
            <label><strong>Doctor's note</strong>:</label>
            <textarea disabled className='form-control' rows={2} value={this.getDoctorsNote()} />
          </div>

          <div className='form-group'>
            <label><strong>Follow up in</strong>:</label>
            <input disabled type='text' className='form-control' value={this.getFollowUpIn()} />
          </div>
          <Message {...this.props} />
        </form>
      </div>
    )
  }
}

export default DoctorDiagnosisDisabled
