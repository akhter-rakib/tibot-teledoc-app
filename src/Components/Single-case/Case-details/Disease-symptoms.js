import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap'

const DiseaseSymptoms = (props) => {
  const apiResKeys = Object.keys(props.apiRes)
  // moving location and patient_details to the top
  var tempArr = []
  const patientDetailsPos = apiResKeys.indexOf('patient_details')
  if (patientDetailsPos >= 0) {
    tempArr.push(apiResKeys.splice(patientDetailsPos, 1)[0])
  }
  const locationPos = apiResKeys.indexOf('location')
  if (locationPos >= 0) {
    tempArr.push(apiResKeys.splice(locationPos, 1)[0])
  }
  const apiResKeysOrdered = [...tempArr, ...apiResKeys]
  return (
    <div className='row'>
      <div className='col-md-12'>
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemHeading>Symptoms</ListGroupItemHeading>
          </ListGroupItem>
          {apiResKeysOrdered.map((key, index) => {
            return <ListGroupItem key={index}>{key}: <i>{props.apiRes[key]}</i></ListGroupItem>
          })}
        </ListGroup>
      </div>
    </div>
  )
}

export default DiseaseSymptoms
