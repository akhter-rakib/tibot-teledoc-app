import React from 'react'

const DiseaseDescription = (props) => {
  return (
    <div className='form-group'>
      <label><strong>Disease description</strong>:</label>
      <textarea required onChange={props.descriptionChangeHandler} className='form-control' rows='5' value={props.description} />
    </div>
  )
}

export default DiseaseDescription
