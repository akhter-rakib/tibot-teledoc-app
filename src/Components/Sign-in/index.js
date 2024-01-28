import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import config from '../../config/config'
import Login from '../../Api/login'
import doctorProfile from '../../Api/doctor-profile'
import { addToken, setIsAuthenticated, setIsAdmin } from '../../actions/authActions'
import { setUserEmail, setDoctorName } from '../../actions/uiActions'

import TibotLogo from '../../assets/tibot-logo-resized.png'

const StyledSignIn = styled.div`
  max-width: 600px;
  margin: 0 auto;
`
const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 15px;
  margin-top: 15px;
`

class SignIn extends Component {

  state = {
    email: '',
    password: '',
    isFSLoaderOpen: false
  }

  toggleFSLoader = () => {
    this.setState(({isFSLoaderOpen}) => {
      return {
        isFSLoaderOpen: !isFSLoaderOpen
      }
    })
  }

  emailHandler = (e) => {
    const email = e.target.value
    this.setState(() => ({
      email: email
    }))
  }

  passwordHandler = (e) => {
    const password = e.target.value
    this.setState(() => ({
      password: password
    }))
  }

  submitHandler = async (e) => {
    e.preventDefault()
    this.toggleFSLoader()
    try {
      const res = await Login(this.state.email, this.state.password)
      this.toggleFSLoader()
      this.props.dispatcher(setUserEmail(this.state.email))
      this.props.dispatcher(addToken(res.data.token))
      this.props.dispatcher(setIsAdmin(res.data.is_admin))
      this.props.dispatcher(setIsAuthenticated(true))
      doctorProfile(this.props.state.authReducer.token)
        .then(res => {
          if(res.data && res.data.name){
            this.props.dispatcher(setDoctorName(res.data.name))
          }
        })
        .catch(err => console.log(err))
      this.props.history.replace(config.baseRoute + 'open-cases')
    } catch (error) {
      this.toggleFSLoader()
      alert('Login failed. Please retry')
      console.log(error)
    }
  }

  render () {
    return (
      <div className='container'>
       {this.state.isFSLoaderOpen && <div className='tibot-full-screen-loader'></div>} 
        <StyledSignIn>
          <LogoWrapper>
            <img src={TibotLogo} alt="Logo" style={{
              maxWidth: '300px',
              margin: '0 auto'
            }}/>
          </LogoWrapper>
          <form onSubmit={this.submitHandler}>
            <div className='form-group'>
              <label htmlFor='email'>Email address:</label>
              <input required type='email' className='form-control' placeholder='Email' value={this.state.email} onChange={this.emailHandler} />
            </div>
            <div className='form-group'>
              <label htmlFor='pwd'>Password:</label>
              <input required type='password' className='form-control' placeholder='Password' value={this.state.password} onChange={this.passwordHandler} />
            </div>
            <button type='submit' className='btn btn-lg btn-primary'>Log in</button>
          </form>
        </StyledSignIn>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatcher : (action) => {
      dispatch(action)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    state : state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
