import React, { Component } from 'react'
import TextMessage from './Message-types/Text'
import Image from './Message-types/Image'

class Renderer extends Component {
  
  getMessages = () => {
    return this.props.patientChat
  }

  getCaseId = () => {
    return this.props.caseId
  }

  render () {
    return (
      <div>
        {this.getMessages().map((message, i) => {
          switch (message.type) {
            case 'text':
              return <TextMessage {...this.props} key={message.id} {...message}/>
            case 'image':
              return <Image {...this.props} key={message.id} {...message} caseId={this.getCaseId()} />
            default:
              return null
          }
        })}
      </div>
    )
  }
}

export default Renderer
