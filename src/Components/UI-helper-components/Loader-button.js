import React from 'react'

const LoaderButton = ({ buttonText = 'Refresh', isLoading = false, clickHandler }) => {
  return (
    <div className='loader-button-wrapper'>
      {isLoading && <div className='la-ball-clip-rotate'>
        <div />
      </div>}
      <button onClick={clickHandler} disabled={!!isLoading} className='btn btn-primary'>
        {buttonText}
      </button>
    </div>
  )
}

export default LoaderButton
