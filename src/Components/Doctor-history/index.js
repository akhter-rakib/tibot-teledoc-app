import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'

import doctorHistoryApi from '../../Api/doctor-history-report'

class DoctorHistory extends Component {

  state = {
    isSpinnerOn: false,
    doneCases: [],
    inProgressCases: []
  }

  componentDidMount () {
    this.toggleSpinner()
    doctorHistoryApi(this.props.state.authReducer.token)
      .then(res => {
        this.toggleSpinner()
        this.setState(() => ({
          doneCases: res.data.doneCases,
          inProgressCases: res.data.inProgressCases
        }))
      })
      .catch(err => {
        this.toggleSpinner()
        alert('Error. Please retry')
      })
  }

  toggleSpinner = () => {
    this.setState(({isSpinnerOn}) => {
      return {
        isSpinnerOn: !isSpinnerOn
      }
    })
  }

  render () {
    return (
      <div className='container'>
        <h2 className='page-heading'>My history</h2>
        {this.state.isSpinnerOn && <div className='square-spinner'></div>}
        {this.state.inProgressCases.length > 0 && <div className='doctor-history-row'><h6 className='doctor-history-title'>In progress cases:</h6>
          <ListGroup>
            {
              this.state.inProgressCases.map((singleCase, index) => {
                return <ListGroupItem key={index}>{singleCase._id.year + '-' + singleCase._id.month + '-' + singleCase._id.day} <span className='badge badge-primary'>{singleCase.count}</span></ListGroupItem>
              })
            }
          </ListGroup></div>}
        {this.state.doneCases.length > 0 && <div className='doctor-history-row'><h6  className='doctor-history-title'>Done cases:</h6>
        <ListGroup>
          {
              this.state.doneCases.map((singleCase, index) => {
                return <ListGroupItem key={index}>{singleCase._id.year + '-' + singleCase._id.month + '-' + singleCase._id.day} <span className='badge badge-primary'>{singleCase.count}</span></ListGroupItem>
              })
            }
        </ListGroup></div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(DoctorHistory)
