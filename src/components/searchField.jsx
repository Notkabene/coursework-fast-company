import React from 'react'
import PropTypes from 'prop-types'

const SearchField = ({ onSearch }) => {
  const handleChange = ({ target }) => {
    onSearch(target.value)
  }

  return (
    <input
      className='form-control m-3'
      type="text"
      placeholder='Поиск'
      onChange={handleChange}
    />

  )
}

SearchField.propTypes = {
  onSearch: PropTypes.func
}

export default SearchField
