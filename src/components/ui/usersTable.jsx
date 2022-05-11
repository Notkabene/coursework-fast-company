import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './bookmark'
import QualitiesList from './qualities/qualitiesList'
import Table from '../common/table/table'

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onChangeStatus,
  onUserChange,
  ...rest
}) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => {
            onChangeStatus(user.bookmark, user._id)
          }}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onUserChange(user._id)}
        >
          delete
        </button>
      )
    }
  }

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />

  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onUserChange: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default UsersTable
