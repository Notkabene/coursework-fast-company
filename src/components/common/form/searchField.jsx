import React from 'react'
import PropTypes from 'prop-types'

const SearchField = ({ onSearch, value }) => {
  const handleChange = ({ target }) => {
    onSearch(target.value)
  }

  return (
    <input
      className='form-control m-3'
      type="text"
      placeholder='Поиск'
      onChange={handleChange}
      value={value}
    />

  )
}

SearchField.propTypes = {
  onSearch: PropTypes.func,
  value: PropTypes.string
}

export default SearchField
