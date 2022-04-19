import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SearchStatus from './searchStatus'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import api from '../api'
import GroupList from './groupList'
import UsersTable from './usersTable'
import _ from 'lodash'

const UsersList = ({ usersList, setUsers }) => {
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [professions, setProfession] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const filteredUsers = selectedProf
    ? usersList.filter(user => user.profession.name === selectedProf.name)
    : usersList

  const qtyPeople = filteredUsers.length

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])

  const userCrop = paginate(sortedUsers, currentPage, pageSize)
  if (userCrop < 1 && currentPage !== 1) {
    setCurrentPage(currentPage - 1)
  }

  const getHeadingClasses = () => {
    let classes = 'badge p-2 m-3 fs-6 '
    classes += qtyPeople === 0 ? 'bg-warning' : 'bg-primary'
    return classes
  }

  const changeStatus = (bookmark, _id) => {
    const updateStatus = usersList.map((user) => {
      if (bookmark === true) {
        if (user._id === _id) {
          user.bookmark = false
        }
        return user
      } else {
        if (user._id === _id) {
          user.bookmark = true
        }
        return user
      }
    })
    setUsers(updateStatus)
  }

  const handleUserChange = (id) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== id))
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  const getHeading = () => {
    const arr = qtyPeople.toString().split('').reverse()
    const peopleVariant = () => {
      const checkLastNumber = arr[0] > 1 && arr[0] < 5
      return (checkLastNumber && qtyPeople > 20) ||
        (qtyPeople < 10 && checkLastNumber)
        ? 'человека'
        : 'человек'
    }

    const getCategoryHeading = () => {
      return selectedProf
        ? `с профессией ${selectedProf.name}`
        : ''
    }

    return qtyPeople > 0
      ? ` ${qtyPeople} ${peopleVariant()} ${getCategoryHeading()} тусанет с тобой сегодня`
      : `Никто ${getCategoryHeading()} не тусанет с тобой сегодня`
  }

  const getTest = () => {
    return selectedProf && (qtyPeople === 0)
      ? <button onClick={clearFilter} className=' d-block btn btn-secondary mt-2 ms-3'>Очистить</button>
      : ''
  }

  return (
  <>
    {<SearchStatus
      onClassName={getHeadingClasses}
      onHeading={getHeading}
      {...usersList}
    />}
    {getTest()}
    {qtyPeople > 0 && (
      <div className='d-flex'>

        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
            />
            <button onClick={clearFilter} className='btn btn-secondary mt-2'>Очистить</button>
          </div>
        )}

        <div className='d-flex flex-column'>

          <UsersTable users={userCrop}
            onUserChange={handleUserChange}
            onChangeStatus={changeStatus}
            onSort={handleSort}
            selectedSort={sortBy}
          />

          <div className='d-flex justify-content-center'>
            <Pagination
              itemsCount={qtyPeople}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

        </div>

      </div>
    )}
  </>
  )
}

UsersList.propTypes = {
  usersList: PropTypes.array,
  setUsers: PropTypes.func
}
export default UsersList
