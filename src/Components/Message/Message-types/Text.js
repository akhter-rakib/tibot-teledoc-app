import React from 'react'

import getTimeDistance from '../../../utilityFunctions/get-time-distance'
import doctorAvatar from '../../../assets/doctor.png'
import patientAvatar from '../../../assets/patient.png'

const TextMessage = (props) => {

  const getClassName = () => {
    return props.origin + '-message'
  }

  const getAvatarSrc = () => {
    return props.origin === 'doctor' ? doctorAvatar: patientAvatar
  }

  return (
    <div className='message-item text-message'>
      <div className={`float-div message-item__wrapper ${getClassName()} clearfix`}>
        <div className="message-item__avatar">
          <img src={getAvatarSrc()} alt='avatar' />
        </div>
        <div className="message-item__content">
          <div className="message-item__content__body">
            {props.content}
          </div>
          <div className="message-item__content__time">
            {getTimeDistance(props.date)} ago
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </div>
  )
}

export default TextMessage
