import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap'
import camelToRegular from '../../../utilityFunctions/cameCase-to-regular'

const styels = {
  demographicWrapper: {
    marginBottom: '20px'
  }
}

const PatientDemographic = (props) => {
  const apiResKeys = Object.keys(props.apiRes)
  return (
    <div className='row' style={styels.demographicWrapper}>
      <div className='col-md-12'>
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemHeading>Patient demographic</ListGroupItemHeading>
          </ListGroupItem>
          {apiResKeys.map((key, index) => {
            return <ListGroupItem key={index}>{ camelToRegular(key)}: <i>{props.apiRes[key]}</i></ListGroupItem>
          })}
        </ListGroup>
      </div>
    </div>
  )
}

export default PatientDemographic
