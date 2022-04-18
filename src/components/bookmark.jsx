import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ status, ...rest }) => {
  return (
    <button className='btn btn-light' {...rest}>
      <i className={status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}></i>
    </button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired
}

export default Bookmark
