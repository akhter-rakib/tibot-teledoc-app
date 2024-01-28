import React from 'react'

const DiseaseListOthers = (props) => {
  return (
    <div className='form-group'>
      <label><strong>Disease name</strong>:</label>
      <input type='text' className='form-control' onChange={props.changeHandler} value={props.fieldValue} required />
    </div>
  )
}

export default DiseaseListOthers
