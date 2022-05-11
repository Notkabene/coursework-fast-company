import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table align-middle">
      {children || <>
        <TableHeader {...{ onSort, selectedSort, columns }} />
        <TableBody {...{ columns, data }} />
      </>}
    </table>
  )
}

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  children: PropTypes.array,
  data: PropTypes.array
}

export default Table