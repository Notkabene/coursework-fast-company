import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ onClassName, onHeading }) => {
  return <span className={onClassName()}>{onHeading()}</span>
}

SearchStatus.propTypes = {
  onClassName: PropTypes.func.isRequired,
  onHeading: PropTypes.func.isRequired
}

export default SearchStatus
