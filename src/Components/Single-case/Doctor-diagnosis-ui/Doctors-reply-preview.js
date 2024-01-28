import React from 'react'

const DoctorsReplyPreview = (props) => {
  return (
    <div className='form-group'>
      <label><strong>Reply preview</strong>:</label>
      <div className='doctors-reply-preview'>
        <p>Diagnosed disease: <i>{props.previewData.doctorsDiagnosis}</i></p>
        <p>Advice: <i>{props.previewData.medication}</i></p>
        <p>Follow up: <i>{props.previewData.followUp}</i></p>
        <p>Doctor's note: <i>{props.previewData.note}</i></p>
        <p>Disease description: <i>{props.previewData.diseaseDescription}</i></p>
      </div>
    </div>
  )
}

export default DoctorsReplyPreview
