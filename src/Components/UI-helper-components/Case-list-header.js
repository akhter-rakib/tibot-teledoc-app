import React, { Fragment } from 'react'
import { ListGroupItem } from 'reactstrap'

const CaseListHeader = (props) => {
  const isCompletedCases = props.listType === 'completedCases'
  return (
    <Fragment>{props.caseList.length > 0 && <ListGroupItem className='case-list-heading-item d-none d-md-block'>
      <div className='case-list__row case-list__row--heading'>
        <div className='case-date'>
                Date
        </div>
        {props.origin === 'pendingCases' && <div className='case-image'>Image</div>}
        <div className='case-open-since'>
                Open since
        </div>
        {props.state.authReducer.isAdmin && isCompletedCases && <div className='case-is-test-premium'>
              Doctor Name
        </div>}
        { (props.origin === 'pendingCases' || props.origin === 'openCases') && props.state.authReducer.isAdmin && <div className='premium-doctor-country'>Doctor country</div>}
        <div className='case-country'>User Country</div>
        <div className='case-state'>User State</div>
        {(props.origin === 'pendingCases' || (props.origin === 'openCases' && props.state.authReducer.isAdmin)) && <div className='case-open' />}
        {props.origin === 'openCases' && !props.state.authReducer.isAdmin && <div className='case-claim' />}
        {props.origin === 'pendingCases' && props.state.authReducer.isAdmin && <div className='remove-case-claim' />}
      </div>
    </ListGroupItem>}
    </Fragment>
  )
}

export default CaseListHeader
