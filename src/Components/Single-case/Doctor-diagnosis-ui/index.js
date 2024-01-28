import React, { Component } from 'react'
import { connect } from 'react-redux'

import getDiseaseListApi from '../../../Api/disease-list'
import getDiseaseMedicineApi from '../../../Api/disease-medicine'
import getDiseaseDescriptionApi from '../../../Api/disease-description'
import doctorReportApi from '../../../Api/doctor-report'

import config from '../../../config/config'

import DiseaseList from './Disease-list'
import DiseaseMedicine from './Disease-medicine'
import DiseaseDescription from './Disease-description'
import DoctorsNote from './Doctors-note'
import DoctorsReplyPreview from './Doctors-reply-preview'
import DoctorsFollowUp from './Doctors-follow-up'
import DiseaseListOthers from './Disease-list-others'

import Message from '../Message'

class DoctorDiagnosisUI extends Component {

  state = {
    diseaseList: [],
    diseaseMedicines: [],
    editedDiseaseMedicines: false,
    diseaseDescription: '',
    doctorsNote: '',
    selectedDisease: '',
    doctorsFollowUp: '',
    isFSLoaderOpen: false,
    showOthersDiseaseInput : false
  }

  componentDidMount () {
    getDiseaseListApi(this.props.state.authReducer.token)
      .then(res => {
        this.setState(() => ({
          diseaseList: res.data.diseaseList
        }))
      })
      .catch(err => alert('Please retry.'))
  }

  shouldShowOthersDiseaseInput = () => {
    return this.state.showOthersDiseaseInput
  }

  othersSelectHandler = () => {
    this.setState(() => ({
      showOthersDiseaseInput: true,
      selectedDisease: '',
      diseaseMedicines: [],
      diseaseDescription: ''
    }))
  }

  otherDiseaseChangeHandler = (e) => {
    const otherDiseaseName = e.target.value
    this.setState(() => ({ selectedDisease: otherDiseaseName }))
  }

  getDiseaseMedicinesAndDescription = (e) => {
    const diseaseName = e.target.value
    if(diseaseName === 'Others') {
      this.othersSelectHandler()
      return
    }
    this.setState(() => ({ showOthersDiseaseInput: false }))
    const diseaseMedicineRes = getDiseaseMedicineApi(this.props.state.authReducer.token, diseaseName, this.props.match.params.caseId)
    const diseaseDescRes = getDiseaseDescriptionApi(this.props.state.authReducer.token, diseaseName)
    Promise.all([diseaseMedicineRes, diseaseDescRes])
      .then(res => {
        this.setState(() => ({
          selectedDisease: diseaseName,
          diseaseMedicines: res[0].data.medicineLise,
          diseaseDescription: res[1].data.diseaseDescription
        }))
      })
      .catch(err => alert('Error. Please retry.'))
  }

  noteChangeHandler = (e) => {
    const note = e.target.value
    this.setState(() => ({
      doctorsNote: note
    }))
  }

  descriptionChangeHandler = (e) => {
    const description = e.target.value
    this.setState(() => ({
      diseaseDescription: description
    }))
  }

  editedDiseaseMedicinesHandler = (e) => {
    const editedDiseaseMedicines = e.target.value
    this.setState(() => ({
      editedDiseaseMedicines: editedDiseaseMedicines
    }))
  }

  followUpChangeHandler = (e) => {
    const followUpTexts = e.target.value
    this.setState(() => ({
      doctorsFollowUp: followUpTexts
    }))
  }

  toggleFSLoader = () => {
    this.setState(({isFSLoaderOpen}) => {
      return {
        isFSLoaderOpen: !isFSLoaderOpen
      }
    })
  }

  getDiseaseList = () => {
    const sortedDiseaseList = this.state.diseaseList.sort()
    const sortedDiseaseListWithOthers = [...sortedDiseaseList, 'Others']
    return sortedDiseaseListWithOthers
  }

  formSubmitHandler = async (e) => {
    e.preventDefault()
    this.toggleFSLoader()
    try {
      const payload = {
        note: this.state.doctorsNote,
        medication: this.state.editedDiseaseMedicines || this.state.editedDiseaseMedicines === ''? this.state.editedDiseaseMedicines : Array.isArray(this.state.diseaseMedicines) && this.state.diseaseMedicines.map(medicine => medicine.name).join(', '),
        doctorsDiagnosis: this.state.selectedDisease,
        followUp: this.state.doctorsFollowUp,
        diseaseDescription: this.state.diseaseDescription
      }
      await doctorReportApi(this.props.match.params.caseId, payload, this.props.state.authReducer.token)
      this.toggleFSLoader()
      alert('Successfully submitted!')
      this.props.history.replace(config.baseRoute + 'pending-cases')
    } catch (err) {
      this.toggleFSLoader()
      alert('Error. Please retry.')
    }
  }

  render () {
    return (
      <div>
        <div className="d-md-none doctor-response-form">Doctor's response form</div>
        {this.state.isFSLoaderOpen && <div className='tibot-full-screen-loader'></div>} 
        <form onSubmit={this.formSubmitHandler}>
          <DiseaseList diseaseList={this.getDiseaseList()} medicineListChange={this.getDiseaseMedicinesAndDescription} />
          {this.shouldShowOthersDiseaseInput() && <DiseaseListOthers
            changeHandler = {this.otherDiseaseChangeHandler}
            fieldValue = {this.state.selectedDisease}
          /> }
          <DiseaseDescription description={this.state.diseaseDescription} descriptionChangeHandler={this.descriptionChangeHandler} />
          <DiseaseMedicine
            editedDiseaseMedicines={this.state.editedDiseaseMedicines} 
            diseaseMedicines={this.state.diseaseMedicines}
            diseaseMedicinesChangeHandler={this.editedDiseaseMedicinesHandler}
          />
          <DoctorsNote note={this.state.doctorsNote} noteChangeHandler={this.noteChangeHandler} />
          <DoctorsFollowUp
            followUpChangeHandler={this.followUpChangeHandler}
            doctorsFollowUp={this.state.doctorsFollowUp}
          />
          <Message
            {...this.props}
          />
          <DoctorsReplyPreview
            previewData={{
              note: this.state.doctorsNote,
              medication: this.state.editedDiseaseMedicines || this.state.editedDiseaseMedicines === ''? this.state.editedDiseaseMedicines : Array.isArray(this.state.diseaseMedicines) && this.state.diseaseMedicines.map(medicine => medicine.name).join(', '),
              doctorsDiagnosis: this.state.selectedDisease,
              followUp: this.state.doctorsFollowUp,
              diseaseDescription: this.state.diseaseDescription
            }}
          />
          <button type="submit" className="btn btn-primary">Complete case</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(DoctorDiagnosisUI)
