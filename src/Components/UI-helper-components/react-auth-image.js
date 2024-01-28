import React, { PureComponent } from 'react'
import axios from 'axios'

const CancelToken = axios.CancelToken
var cancelFuncs = []

class Image extends PureComponent {

  _isMounted = true

  executor = (cancel) => {
    cancelFuncs = [...cancelFuncs, cancel]
  }

  componentWillUnmount () {
    this._isMounted = false
    if(cancelFuncs.length > 0) {
      cancelFuncs.forEach(func => func('Cancelled image request'))
    }
  }

  onImageLoaded = async (node) => {
    try {
      if(this.props.onStart) this.props.onStart()
      const headers = this.props.headers
      const targetUrl = this.props.targetUrl
      const config = this.props.config? {
        ...this.props.config,
        cancelToken: new CancelToken(this.executor),
        headers: headers
      } : { 
        responseType: 'blob',
        cancelToken: new CancelToken(this.executor),
        headers: headers }
      const res = await axios.get(targetUrl, config)
      const urlCreator = window.URL || window.webkitURL
      const objURL = urlCreator.createObjectURL(res.data)
      if(this._isMounted && node) node.src = objURL
      if(this.props.onFinish) this.props.onFinish()
    } catch (error) {
      if(this._isMounted && node) {
        if(this.props.onFail) this.props.onFail()
        node.src = this.props.failedImage
      }
    }
  }

  render () {
    return <img
    src={this.props.defaultImage}
    ref={this.onImageLoaded}
    alt={this.props.alt}
    className={this.props.className}
    />
  }
}

export default Image
