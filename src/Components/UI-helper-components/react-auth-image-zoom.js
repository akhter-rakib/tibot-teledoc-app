import React, { Component } from 'react'
import axios from 'axios'
import ReactImageMagnify from 'react-image-magnify'
import styled from 'styled-components'

const MagnifyImageWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  flex: 0 0 33%;
`

const CancelToken = axios.CancelToken
var cancelFuncs = []

class Image extends Component {

  state = {
    imageUrl: this.props.defaultImage,
    imageLoaded: false,
    imgWidth: 800,
    imgHeight: 800
  }

  _isMounted = true

  executor = (cancel) => {
    cancelFuncs = [...cancelFuncs, cancel]
  }

  componentDidMount () {
    this.loadImage()
  }
  componentWillUnmount () {
    this._isMounted = false
    if(cancelFuncs.length > 0) {
      cancelFuncs.forEach(func => func('Cancelled image request'))
    }
  }

  loadImage = async () => {
    try {
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
      var img = document.createElement('img')
      img.src = objURL
      img.onload = function () {
        if(this._isMounted) {
          this.setState(() => ({
            imageUrl: objURL,
            imageLoaded: true,
            imgWidth: img.width,
            imgHeight: img.height
          }), () => {
            img = null
          })
        }
      }.bind(this)
    } catch (error) {
      if(this._isMounted) {
        this.setState(() => ({
          imageUrl: this.props.failedUrl
        }))
      }
    }
  }

  render () {
    return <div className='single-auth-image'>
      {!this.state.imageLoaded? <img src={this.props.defaultImage} alt='placeholder' /> :
        <MagnifyImageWrapper>
          <ReactImageMagnify
            {...{
              smallImage: {
                src: this.state.imageUrl,
                isFluidWidth: true,
                alt: 'Affected area'
              },
              largeImage: {
                src: this.state.imageUrl,
                width: this.state.imgWidth,
                height: this.state.imgHeight,
                alt:''
              },
              imageClassName: 'small-case-image',
              enlargedImageContainerClassName: 'enlarged-case-image',
              enlargedImageContainerDimensions: {
                width: '200%',
                height: '200%'
              }
            }}
          />
        </MagnifyImageWrapper>
      }
    </div>
  }
}

export default Image
