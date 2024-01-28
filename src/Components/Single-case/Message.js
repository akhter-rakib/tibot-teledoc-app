import React, { useRef, useState } from 'react'
import Message from '../Message'

const SingleCaseMessageWrapper = (props) => {
  const messageWrapper = useRef(null)
  const [messageLength, setMessageLength] = useState(0)
  const customScrollDown = () => {
    if(messageWrapper.current) {
      messageWrapper.current.scrollTop = messageWrapper.current.scrollHeight
    }
  }
  return (
    <div style={{
      display: messageLength? 'block': 'none'
    }} className="single-case-message-section">
      <strong>Messages</strong>
      <div ref={messageWrapper} className='single-case-message-wrapper'>
        <Message 
          {...props}
          shouldWindowScroll={false}
          customScrollDown={customScrollDown}
          setMessageLength={setMessageLength}
        />
      </div>
    </div>
  )
}


export default SingleCaseMessageWrapper
