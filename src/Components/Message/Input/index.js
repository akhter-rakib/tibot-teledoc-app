import React, { Component } from 'react'
import { IoMdImage, IoIosSend } from 'react-icons/io'
import TextAreaAutoResize from 'react-autosize-textarea'

import getLocalDateUTC from '../../../utilityFunctions/local-date-utc'

class MessageInput extends Component {
  
  state = {
    textInput: ''
  }

  onImageInput = (e) => {
    e.preventDefault()
    var self = this
    const currTime = new Date().getTime()
    const image = e.target.files[0]
    if(!image) return
    if(image.size > 1024*1024*10) {
      alert('Image size too big. Please upload a smaller image.')
      return
    }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(image)
    fileReader.onload = function (event) {
        self.props.rootStateChanger({
          type: 'ADD_IMAGE_MESSAGE',
          payload: event.target.result,
          uploadPayload: image,
          date: getLocalDateUTC(),
          timeStamp: currTime
        })
        document.getElementById('message-image-upload').value = null
    }
  }

  textChangeHandler = (e) => {
    const value = e.target.value
    this.setState(() => ({
      textInput: value
    }))
  }

  onKeyDownHandler = (e) => {
    if(e.key === 'Enter') {
      this.props.scrollToBottom()
    }
  }

  submitHandler = (e) => {
    if(this.state.textInput === '') return
    e.preventDefault()
    const value = this.state.textInput
    this.props.rootStateChanger({
      type: 'ADD_TEXT_MESSAGE',
      payload: value,
      date: getLocalDateUTC()
    })
    this.setState(() => ({ textInput: '' }))
  }

  render () {
    return (
      <div className='message-input'>
        <div className="row message-input__input-row">
          <div className="col-1">
            <label className='message-input__input-image-icon' htmlFor='message-image-upload'><IoMdImage /></label>
            <input className='message-input__chat-image-upload-input' type='file' onChange={this.onImageInput} id='message-image-upload' />
          </div>
          <div className="col-8">
            <TextAreaAutoResize onKeyDown={this.onKeyDownHandler} autoFocus className='message-input__textarea' placeholder='Your message...' onChange={this.textChangeHandler} value={this.state.textInput} />
          </div>
          <div className="col-3">
            <div className='message-input__send'>
              <IoIosSend onClick={this.submitHandler} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageInput
