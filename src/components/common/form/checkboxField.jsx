import React from 'react'
import PropTypes from 'prop-types'

const CheckboxField = ({ name, onChange, value, children, error }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value })
  }
  const getInputClasses = () => {
    return 'form-check-input' + (error ? ' is-invalid' : '')
  }
  return (
    <div className="form-check mb-4">
      <input
        className={getInputClasses()}
        type="checkbox"
        value=""
        id="flexCheckDefault"
        onChange={handleChange}
        checked={value}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

CheckboxField.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CheckboxField
