import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { get } from 'lodash'

import premiumCaseDetails from '../../../Api/premium-case-details'
import UTCToLocal from '../../../utilityFunctions/utc-to-local'
import imageIdGenerator from '../../../utilityFunctions/image-id-generator'
import endpoints from '../../../config/endpoints'
import config from '../../../config/config'

import DiseaseSymptoms from './Disease-symptoms'
import PatientDemographic from './Patient-demographic'
import ReactAuthImageZoom from '../../UI-helper-components/react-auth-image-zoom'

import loadingGif from '../../../assets/loading.gif'
import { tibotAuthImageToBlob, saveBlob } from '../../../utilityFunctions/auth-image-to-blob'
import ajaxLoader from '../../../assets/ajax-loader.gif'

class CaseDetails extends Component {

  state = {
    caseDetails: {},
    diseaseSymptoms: {},
    downloadableImages: [],
    currentlyDownloadingImages: []
  }
  
  getChatButtonText = () => {
    return this.state.caseDetails.isDoctorUnread? 'Messages (1)' : 'Send message'
  }

  getMessageUrl = () => {
    return config.baseRoute + 'message/' + this.props.match.params.caseId
  }

  shouldShowPatientDemographic = () => {
    return Object.entries(this.getPatientDemographic()).length > 0
  }

  getPatientDemographic = () => {
    try {
      const demographicData = get(this, 'state.caseDetails.patientDemographic')
      if (!demographicData) {
        return {}
      }
      if (typeof demographicData === 'string') {
        const patientDemographic = get(this, 'state.caseDetails.patientDemographic', '{}')
        const parsedDemographic = JSON.parse(patientDemographic)
        return parsedDemographic.nameValuePairs ? parsedDemographic.nameValuePairs : parsedDemographic
      } else {
        return demographicData
      }
    } catch (error) {
      return {}
    }
  }

  downloadSelectedImage = async (imagePath, cb) => {
      const blob = await tibotAuthImageToBlob(
        imagePath,
        this.props.state.authReducer.token,
        this.props.match.params.caseId
      )
      saveBlob(blob, imagePath)
      if(cb && typeof cb === 'function') {
        cb()
      }
  }

  isImageDownloading = (index) => {
    return this.state.currentlyDownloadingImages.indexOf(index) >= 0
  }

  viewDownloadableImages = () => {
    return this.state.downloadableImages.map((image, index)=> {
      return (
          <button style={{
            backgroundColor: this.isImageDownloading(index)? 'grey': '#15A1CA'
          }} disabled={this.isImageDownloading(index)} className='blob-square' onClick={() => {
              if(this.isImageDownloading(index)) return
              this.setState(() => ({
                currentlyDownloadingImages: [...this.state.currentlyDownloadingImages, index]
              }))
              this.downloadSelectedImage(image, () => {
                this.setState(() => ({
                  currentlyDownloadingImages: this.state.currentlyDownloadingImages.filter(imageIndex => imageIndex !== index)
                }))
              })
          }} key={index + 1}>{this.isImageDownloading(index)? <img alt='' src={ajaxLoader} /> : index + 1}</button>
      )
    })
  }

  componentDidMount () {
    premiumCaseDetails(this.props.state.authReducer.token, this.props.match.params.caseId)
      .then(res => {
        this.setState(() => ({
          caseDetails: res.data,
          diseaseSymptoms: res.data.symptoms,
          downloadableImages: res.data.images
        }))
        this.props.singleCaseRootChangeHandler({
          pending: res.data.pending,
          caseDetails: res.data
        })
      })
      .catch(err => {
        alert('Error. Please retry.')
      }) 
   }

  render() {
    const isAdmin = get(this, 'props.state.authReducer.isAdmin')
    return (
        <div>
            <h2>{ this.state.caseDetails.date && UTCToLocal(this.state.caseDetails.date) }</h2>
            <div className="row">
              <div className="col-md-12">
                <div className="image-box-wrapper">
                  {this.state.caseDetails.images && this.state.caseDetails.images.map((url, index) => {
                    return <ReactAuthImageZoom key={index} 
                      targetUrl={endpoints.GET_IMAGE}
                      headers={{
                        imageId: imageIdGenerator(url),
                        token: this.props.state.authReducer.token,
                        caseId: this.props.match.params.caseId
                      }}
                      defaultImage={loadingGif}
                      alt='test'
                    />
                  })}
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: '20px', marginBottom: '9px'}}>
              <div className="col-md-12">
                <strong>Download Images</strong>
                <div className='downloadable-images-blocks'>
                  {this.viewDownloadableImages()}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {this.state.caseDetails && this.state.caseDetails.extraData &&
                  <p><strong>User Country</strong>: {this.state.caseDetails.userCountry}</p>
                }
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {this.state.caseDetails && this.state.caseDetails.extraData &&
                  <p><strong>User Locality</strong>: {this.state.caseDetails.userLocality}</p>
                }
              </div>
            </div>
            {isAdmin && <div className="row">
              <div className="col-md-12">
                {this.state.caseDetails && this.state.caseDetails.extraData &&
                  <p><strong>Doctor name</strong>: {this.state.caseDetails.doctorName}</p>
                }
              </div>
            </div>}
            <div className="row">
              <div className="col-md-12">
                {this.state.caseDetails && this.state.caseDetails.extraData &&
                  <p><strong>User's Note</strong>: {this.state.caseDetails.extraData.additionalNotes}</p>
                }
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Link style={styles.chatButton} className='btn btn-primary' to={this.getMessageUrl()}>{this.getChatButtonText()}</Link>
              </div>
            </div>
            {this.shouldShowPatientDemographic() && <div className='row'>
              <div className="col-md-12">
                <PatientDemographic apiRes={this.getPatientDemographic()} />
              </div>
            </div>}
            <div className='row'>
              <div className="col-md-12">
                <DiseaseSymptoms apiRes={this.state.diseaseSymptoms} />
              </div>
            </div>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const styles = {
  chatButton: {
    marginBottom: '10px'
  }
}
 
export default connect(mapStateToProps)(CaseDetails)
