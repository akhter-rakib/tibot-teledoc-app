import React from 'react'

const DiseaseMedicine = (props) => {
  const diseaseMedicinesVal = (props) => {
    if (props.editedDiseaseMedicines !== false) {
      return props.editedDiseaseMedicines
    } else {
      return props.diseaseMedicines ? props.diseaseMedicines.map(medicine => medicine.name).join(', ') : ''
    }
  }

  return (
    <div className='form-group'>
      <label><strong>Advice</strong>:</label>
      <textarea rows='5' onChange={props.diseaseMedicinesChangeHandler} required className='form-control' value={diseaseMedicinesVal(props)} />
    </div>
  )
}

export default DiseaseMedicine
