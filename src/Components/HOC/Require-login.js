import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import config from '../../config/config'

const RequireLogin = Component => (props) => {
  return (
    <Fragment>
      {props.state.authReducer.isAuthenticated ? <Component /> : props.history.replace(config.baseRoute)}
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default compose(
  connect(mapStateToProps, null),
  RequireLogin
)
