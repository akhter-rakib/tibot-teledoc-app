import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import RequireLogin from './HOC/Require-login'
import WithMenu from '../Components/HOC/With-menu'
import config from './../config/config'

import SignIn from './Sign-in'
import PendingCases from './Pending-cases'
import CompletedCases from './Completed-cases'
import OpenCases from './Open-cases'
import DoctorHistory from './Doctor-history'
import SingleCase from './Single-case'
import Message from './Message'
import Messages from './Messages'

class Main extends Component {
  render () {
    return (
      <div className='main-wrapper'>
        <Router>
          <Switch>
            <Route path={config.baseRoute} component={SignIn} exact />
            <Route path={`${config.baseRoute}pending-cases`} component={RequireLogin(WithMenu(PendingCases))} exact />
            <Route path={`${config.baseRoute}open-cases`} component={RequireLogin(WithMenu(OpenCases))} exact />
            <Route path={`${config.baseRoute}completed-cases`} component={RequireLogin(WithMenu(CompletedCases))} exact />            
            <Route path={`${config.baseRoute}my-history`} component={RequireLogin(WithMenu(DoctorHistory))} exact />
            <Route path={`${config.baseRoute}single-case/:caseId`} component={RequireLogin(WithMenu(SingleCase))} exact />
            <Route path={`${config.baseRoute}message/:caseId`} component={RequireLogin(WithMenu(Message))} exact />
            <Route path={`${config.baseRoute}messages`} component={RequireLogin(WithMenu(Messages))} exact />
            <Route component={SignIn} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default Main
