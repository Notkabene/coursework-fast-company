import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  const getCaret = (column) => {
    if (column === selectedSort.path) {
      if (selectedSort.order === 'asc') {
        return <i className="bi bi-caret-up-fill"></i>
      }
      if (selectedSort.order === 'desc') {
        return <i className="bi bi-caret-down-fill"></i>
      }
    }
  }

  return (
    <thead>
        <tr>
          {Object.keys(columns).map(column => (
            <th className=''
            key={column}
            onClick={columns[column].path
              ? () => handleSort(columns[column].path)
              : undefined}
            {...{ role: columns[column].path && 'button' }}
            scope="col"
            >{getCaret(column)}
              {columns[column].name}
            </th>
          ))}
        </tr>
      </thead>
  )
}

TableHeader.propTypes = {
  columns: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default TableHeader
