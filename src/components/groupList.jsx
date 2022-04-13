import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({ items, valueProperty, contentPropety, onItemSelect, selectedItem }) => {
  return (
  <ul className='list-group'>
    {Object.keys(items).map(item => (
      <li
        key={items[item][valueProperty]}
        className={'list-group-item' + (items[item] === selectedItem ? ' active' : '')}
        onClick={() => onItemSelect(items[item])}
        role='button'
      >
        {items[item][contentPropety]}
      </li>
    ))}
  </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentPropety: 'name'
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentPropety: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
}

export default GroupList
