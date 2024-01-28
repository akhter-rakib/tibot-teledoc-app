import React from 'react'
import moment from 'moment'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'

import UTCToLocal from '../../utilityFunctions/utc-to-local'
import imageIdGenerator from '../../utilityFunctions/image-id-generator'
import ClaimCase from '../../Api/claim-case'
import removeCaseClaim from '../../Api/remove-case-claim'
import endpoints from '../../config/endpoints'

import ReactAuthImage from '../UI-helper-components/react-auth-image'
import CaseListHeader from '../UI-helper-components/Case-list-header'

import loadingGif from '../../assets/loading.gif'
import config from '../../config/config'

const getFormattedDate = (dateStr) => {
  return moment(dateStr)
}

const CaseList = (props) => {
  const isCompletedCases = props.listType === 'completedCases'
  const momentNow = moment()
  return (
    <div className='case-list'>
      { props.casesLoaded && props.caseList.length === 0 ? <div style={{ textAlign: 'center' }}>No cases to show</div> : <ListGroup>
        <CaseListHeader
          {...props}
          listType={props.listType}
        />
        {props.caseList && props.caseList.map((singleCase, index) => {
          return (<ListGroupItem key={index}>
            <div className='case-list__row'>
              <div className='case-date'>
                {UTCToLocal(singleCase.date)}
              </div>
              {props.origin === 'pendingCases' && <div className='case-image'>
                <ReactAuthImage
                  targetUrl={endpoints.GET_IMAGE}
                  headers={{
                    imageId: singleCase.images && singleCase.images[0] && imageIdGenerator(singleCase.images[0]),
                    token: props.state.authReducer.token,
                    caseId: singleCase.id
                  }}
                  defaultImage={loadingGif}
                />
              </div>}
              <div className='case-open-since'>
                <span className='d-md-none mobile-only-th'>Open since<span className='no-bold'>:</span></span> {moment.duration(momentNow.diff(getFormattedDate(singleCase.date))).humanize()} ago
              </div>
              {props.state.authReducer.isAdmin && isCompletedCases && <div className='case-is-test-premium'>
                <span className='d-md-none mobile-only-th'>Doctor name<span className='no-bold'>:</span></span> {singleCase.doctorName}
              </div>}
              {(props.origin === 'pendingCases' || props.origin === 'openCases') && props.state.authReducer.isAdmin && <div className='premium-doctor-country'>
                <span className='d-md-none mobile-only-th'>Doctor country<span className='no-bold'>:</span></span> {singleCase.premiumDoctorCountry}
              </div>}
              <div className='case-country user-country'>
                <span className='d-md-none mobile-only-th'>User country<span className='no-bold'>:</span></span> {singleCase.country}
              </div>
              <div className='case-state'>
                <span className='d-md-none mobile-only-th'>User state<span className='no-bold'>:</span></span> {singleCase.state}
              </div>
              {(props.origin === 'pendingCases' || (props.origin === 'openCases' && props.state.authReducer.isAdmin)) && <div className='case-open'>
                <Link to={config.baseRoute + 'single-case/' + singleCase.id} className='btn btn-primary'> Open </Link>
              </div>}
              {props.origin === 'openCases' && !props.state.authReducer.isAdmin && <div className='case-claim'>
                <button type='button' className='btn btn-primary' onClick={async () => {
                  try {
                    props.toggleFullScreenLoader()
                    await ClaimCase(singleCase.id, props.state.authReducer.token)
                    props.toggleFullScreenLoader()
                    props.history.push(config.baseRoute + 'single-case/' + singleCase.id)
                  } catch (error) {
                    console.log(error)
                    props.toggleFullScreenLoader()
                    window.alert('Error in claiming the case. Please retry.')
                  }
                }}>Claim</button>
              </div>}

              {props.origin === 'pendingCases' && props.state.authReducer.isAdmin && <div className='remove-case-claim'>
                <button type='button' className='btn btn-primary' onClick={async () => {
                  try {
                    props.toggleFullScreenLoader()
                    await removeCaseClaim(singleCase.id, props.state.authReducer.token)
                    props.toggleFullScreenLoader()
                    props.reloadCases()
                  } catch (error) {
                    console.log(error)
                    props.toggleFullScreenLoader()
                    window.alert('Error. Please retry.')
                  }
                }}>Remove Claim</button>
              </div>}

            </div>
          </ListGroupItem>)
        })}
      </ListGroup> }
    </div>
  )
}

export default withRouter(CaseList)
