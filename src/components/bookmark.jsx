import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = (props) => {
  const { bookmark, onChangeStatus } = props

  return (
    <i
      className={bookmark ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}
      onClick={() => {
        onChangeStatus(props)
      }}
    ></i>
  )
}

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  onChangeStatus: PropTypes.func.isRequired
}

export default Bookmark
