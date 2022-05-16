import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const MultiSelectField = ({ options, onChange, name, label, defaultValue, value }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.values(options)
      : options

  const handleChange = (value) => {
    onChange({ name: name, value })
  }

  return (
    <div className='mb-4'>
      <label className="me-2 mb-2">
        {label}
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        value={value}
        defaultValue={defaultValue}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.array,
  defaultValue: PropTypes.array
}

export default MultiSelectField
