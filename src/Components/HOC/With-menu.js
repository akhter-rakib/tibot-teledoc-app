import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Menu from '../Menu'

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const WithMenu = (Component) => {
  class CompWithMenu extends React.Component {
    render () {
      return (
        <Fragment>
          <div className='tibot-menu-wrapper sticky-top'>
            <div className='container'>
              <Menu />
            </div>
          </div>
          <div className='container'>
            {this.props.state.uiReducer.doctorName && <div className='doctor-name-under-menu'>{this.props.state.uiReducer.doctorName}</div>}
          </div>
          <Component />
        </Fragment>
      )
    }
  }
  return connect(mapStateToProps)(CompWithMenu)
}

export default WithMenu
