import React from 'react'

const DiseaseList = (props) => {
  return (
    <div>
      <div className='form-group'>
        <label><strong>Select disease</strong>:</label>
        <select defaultValue='' className='form-control' onChange={props.medicineListChange}>
          <option disabled value=''>Select a disease</option>
          {props.diseaseList.map((disease, index) => {
            return <option key={index}>{disease}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default DiseaseList
