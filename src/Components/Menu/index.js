import React, {Fragment} from 'react'
import { Navbar, Nav, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import config from '../../config/config'
import TibotLogo from '../../assets/tibot-logo-icon-white.png'

import pendingCasesApi from '../../Api/pending-cases'
import completeCasesApi from '../../Api/Complete-cases'

import pendingCasesToMessageCount from '../../utilityFunctions/pending-cases-to-unread-message-count'
import { setUnreadMessageCount } from '../../actions/uiActions'

class Menu extends React.Component {

  state = {
    dropdownOpen: false
  }

  toggle = () => {
    this.setState((currentState) => ({
      dropdownOpen: !currentState.dropdownOpen
    }))
  }

  getMessageCount = () => {
    return this.props.state.uiReducer.unreadMessageCount
  }

  componentDidMount () {
    if(this.props.state.authReducer.isAuthenticated) {
      setTimeout(() => {
        pendingCasesApi(this.props.state.authReducer.token)
        .then(res => {
          const pendingUnreadCount = pendingCasesToMessageCount(res.data.pendingCases)
          completeCasesApi(this.props.state.authReducer.token)
            .then(response => {
              const completeCasesUnreadCount = pendingCasesToMessageCount(response.data.completeCases)
              this.props.dispatcher(setUnreadMessageCount)(pendingUnreadCount + completeCasesUnreadCount)
            })
        })
        .catch(err => {
          console.log(err)
        })
      }, 10)
    }
  }

  render () {
    return (
      <Fragment>
      {this.props.state.authReducer.isAuthenticated?
        <Navbar className='d-flex justify-content-between'>
          <div className='logo-holder'>
            <NavLink to={config.baseRoute + 'open-cases'}> <img alt='Tibot logo' src={TibotLogo} /> </NavLink>
          </div>
          <Nav navbar>
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              {this.getMessageCount() > 0 && <div className='message-notification-icon'>{this.getMessageCount()}</div>}
              <DropdownToggle className='toggler-link' nav caret>
                Menu
              </DropdownToggle>
              <DropdownMenu>
                <NavLink className='tibot-menu-item' to={config.baseRoute + 'open-cases'}>Open cases</NavLink>
                <NavLink className='tibot-menu-item' to={config.baseRoute + 'pending-cases'}>Pending cases</NavLink>
                <NavLink className='tibot-menu-item' to={config.baseRoute + 'completed-cases'}>Completed cases</NavLink>
                <NavLink className='tibot-menu-item' to={config.baseRoute + 'messages'}>Messages {this.getMessageCount() > 0 && '(' + this.getMessageCount() + ')'}</NavLink>
                {!this.props.state.authReducer.isAdmin && <NavLink className='tibot-menu-item' to={config.baseRoute + 'my-history'}>My history</NavLink>}
                <a className='tibot-menu-item' href={config.baseRoute}>Log out</a>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Navbar>
      : null }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatcher : (action) => {
      return (arg) => {
        dispatch(action(arg))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
