import React from 'react'
import { connect } from 'react-redux'

import config from '../../../config/config'
import ReactAuthImage from '../../UI-helper-components/react-auth-image'
import UserImage from './User-image'
import getTimeDistance from '../../../utilityFunctions/get-time-distance'
import loading from '../../../assets/loading.gif'
import doctorAvatar from '../../../assets/doctor.png'
import patientAvatar from '../../../assets/patient.png'

const Image = (props) => {
  const getClassName = () => {
    return props.origin + '-message'
  }

  const getAvatarSrc = () => {
    return props.origin === 'doctor' ? doctorAvatar : patientAvatar
  }

  return (
    <div className='message-item image-message'>
      <div className={`float-div message-item__wrapper ${getClassName()} clearfix`}>
        <div className='message-item__avatar'>
          <img src={getAvatarSrc()} alt='avatar' />
        </div>
        <div className='message-item__content'>
          <div className='message-item__content__body'>
            {props.src ? <UserImage {...props} /> : <ReactAuthImage
              onFinish={() => {
                setTimeout(props.scrollToBottom, 300);
              }}
              targetUrl={config.API_ROOT + '/image'}
              headers={{
                imageId: props.content,
                token: props.state.authReducer.token,
                caseId: props.caseId
              }}
              className='message-image'
              defaultImage={loading}
            />
            }
          </div>
          <div className='message-item__content__time'>
            {getTimeDistance(props.date)} ago
          </div>
        </div>
      </div>
      <div className='clearfix' />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(Image)
