import React from 'react'

const styles = {
  wrapper: {
    position: 'relative'
  }
}

const UserImage = (props) => {
  const isPending = props.pendingUploads.indexOf(props.timeStamp) >= 0
  return (
    <div style={styles.wrapper}>
      {isPending && <div className='message-image-loader'/>}
      <img className='message-image' alt='message' src={props.src} />
    </div>
  )
}

export default UserImage
