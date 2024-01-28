import React from 'react'

const DoctorsFollowUp = (props) => {
  return (
    <div className='form-group'>
      <label><strong>Follow up in</strong>:</label>
      <input onChange={props.followUpChangeHandler} type='text' className='form-control' value={props.doctorsFollowUp} />
    </div>
  )
}

export default DoctorsFollowUp
