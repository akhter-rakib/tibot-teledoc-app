import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'

import imageIdGenerator from '../../utilityFunctions/image-id-generator'
import loadingGif from '../../assets/loading.gif'
import endpoints from '../../config/endpoints'
import config from '../../config/config'
import ReactAuthImage from '../UI-helper-components/react-auth-image'
import UtcToLocal from '../../utilityFunctions/utc-to-local'

class MessageList extends React.Component {

  getDoctorUnreadClass = (heading) => {
    return heading.isDoctorUnread? ' doctor-unread' : ''
  }

  render () {
    return (
      <div className='message-list'>
        <ListGroup>
          {this.props.messageHeadings.map(heading => {
            return (
              <ListGroupItem key={heading.id}>
                <Link className={`message-list__link${this.getDoctorUnreadClass(heading)}`} to={config.baseRoute + 'single-case/' + heading.id}>
                  <div className='message-list__row'>
                    <div className='message-list__image'>
                      <ReactAuthImage
                        targetUrl={endpoints.GET_IMAGE}
                        headers={{
                          imageId: heading.images && heading.images[0] && imageIdGenerator(heading.images[0]),
                          token: this.props.state.authReducer.token,
                          caseId: heading.id
                        }}
                        defaultImage={loadingGif}
                      />
                    </div>
                    <div className='message-list__date'>
                      {UtcToLocal(heading.date)}
                    </div>
                  </div>
                </Link>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default MessageList
