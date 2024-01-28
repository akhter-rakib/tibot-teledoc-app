import React from 'react'

const DoctorsNote = (props) => {
  return (
    <div className='form-group'>
      <label><strong>Doctor's note</strong>:</label>
      <textarea rows={2} required onChange={props.noteChangeHandler} className='form-control' value={props.doctorsNote} />
    </div>
  )
}

export default DoctorsNote
