import React from 'react'
import PropTypes from 'prop-types'

const Loader = () => {
  // console.log(onLoader)
  return <div id='loader' className='ms-5 mt-5'>
          <div className="spinner-border text-danger" role="status">
          <span className="sr-only"></span>
          </div>
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-border text-info" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
}
export default Loader

Loader.propTypes = {
  onLoader: PropTypes.func.isRequired
}
