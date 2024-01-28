import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'

import getChat from '../../Api/get-chat'
import postChat from '../../Api/post-chat'
import uploadImage from '../../Api/upload-image'
import Renderer from './Renderer'
import InputBox from './Input'

class Chat extends Component {

  state = {
    patientChat: [],
    pendingUploads: []
  }

  getCaseId = () => {
    return this.props.match.params.caseId
  }

  getToken = () => {
    return this.props.state.authReducer.token
  }
  
  getPatientChat = () => {
    return this.state.patientChat.length > 0 ? this.state.patientChat : false
  }
  
  scrollToBottom = () => {
    if(this.props.customScrollDown) {
      this.props.customScrollDown()
    }
    if(this.props.customScroller) {
      this.props.customScroller()
    }
    if(this.props.shouldWindowScroll === false) {
      return
    }
    if(this.messageEnd) {
      this.messageEnd.scrollIntoView({
        behavior: 'auto'
      })
    } else if (document.getElementById('message-end')) {
      document.getElementById('message-end').scrollIntoView({
        behavior: 'auto'
      })
    }
  }

  addPendingUpload = (timeStamp) => {
    this.setState(() => ({
      pendingUploads: [...this.state.pendingUploads, timeStamp]
    }))
  }

  removePendingUpload = (timeStamp) => {
    this.setState(() => ({
      pendingUploads: this.state.pendingUploads.filter(item => item !== timeStamp)
    }))
  }

  addTextMessage = (action) => {
    const message = {
      type: 'text',
      content: action.payload,
      origin: 'doctor',
      date: action.date
    }
    this.setState(() => ({
      patientChat: [...this.state.patientChat, message]
    }))
  }

  addImageMessage = (action) => {
    const message = {
      type: 'image',
      content: '',
      origin: 'doctor',
      src: action.payload,
      date: action.date,
      timeStamp: action.timeStamp
    }
    this.setState(() => ({
      patientChat: [...this.state.patientChat, message]
    }))
    this.addPendingUpload(action.timeStamp)
  }

  rootStateChanger = (action) => {
    if(action.type === 'ADD_TEXT_MESSAGE') {
      this.addTextMessage(action)
      postChat(this.getCaseId(), 'TibotWebTest', 'text', 'doctor', action.payload, this.getToken())
    }

    if(action.type === 'ADD_IMAGE_MESSAGE') {
      this.addImageMessage(action)
      uploadImage(this.getCaseId(), action.uploadPayload, this.getToken())
        .then(res => {
          const fileId = res.data.fileId
          return postChat(this.getCaseId(), 'TibotWebTest', 'image', 'doctor', fileId, this.getToken())
        })
        .then(res => {
          this.removePendingUpload(action.timeStamp)
        })
        .catch(err => {
          alert('Error. Please retry.')
        })
    }
  }

  componentDidMount () {
    this.scrollToBottom()
    getChat(this.getCaseId(), this.getToken())
      .then(res => {
        this.setState(() => ({
          patientChat: res.data.patientChat
        }))
        if(this.props.setMessageLength) {
          this.props.setMessageLength(res.data.patientChat.length)
          if(this.props.customScrollDown) {
            this.props.customScrollDown()
          }
        }
      })
      .catch(err => {
        alert('Error. Please retry.')
      })
  }

  componentDidUpdate (prevProps, prevState) {
    if(!isEqual(prevState.patientChat, this.state.patientChat)) {
      this.scrollToBottom()
    }
  }

  render () {
    return (
      <div className='container message-wrapper'>
        <div>
          {this.getPatientChat() && 
            <Renderer
              scrollToBottom={this.scrollToBottom}
              pendingUploads={this.state.pendingUploads}
              patientChat={this.getPatientChat()}
              caseId={this.getCaseId()}
            />
          }
        </div>
        <InputBox
          scrollToBottom={this.scrollToBottom}
          rootStateChanger={this.rootStateChanger}
        />
        <div onLoad={this.scrollToBottom} id='message-end' style={{float: 'left', clear: 'both'}} ref={(el) => {
          this.messageEnd = el }}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(withRouter(Chat))
