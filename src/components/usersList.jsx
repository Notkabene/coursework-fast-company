import React, { useState } from 'react'
import api from '../api'
import User from './user'
import SearchStatus from './searchStatus'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'

const UsersList = () => {
  const users = api.users.fetchAll()
  const [usersList, setUsers] = useState(users)
  const qtyPeople = usersList.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const userCrop = paginate(usersList, currentPage, pageSize)

  const getHeadingClasses = () => {
    let classes = 'badge p-2 mt-1 fs-6 '
    classes += qtyPeople === 0 ? 'bg-warning' : 'bg-primary'
    return classes
  }

  const changeStatus = (item) => {
    const updateStatus = usersList.map((user) => {
      if (item.bookmark === true) {
        if (user._id === item._id) {
          user.bookmark = false
        }
        return user
      } else {
        if (user._id === item._id) {
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

  const getHeading = () => {
    const arr = qtyPeople.toString().split('').reverse()
    const peopleVariant = () => {
      const checkLastNumber = arr[0] > 1 && arr[0] < 5
      return (checkLastNumber && qtyPeople > 20) ||
        (qtyPeople < 10 && checkLastNumber)
        ? 'человека'
        : 'человек'
    }

    return qtyPeople !== 0
      ? ` ${qtyPeople} ${peopleVariant()} тусанет с тобой сегодня`
      : 'Никто не тусанет с тобой сегодня'
  }

  return (
    qtyPeople !== 0 && (
      <>
        <SearchStatus
          onClassName={getHeadingClasses}
          onHeading={getHeading}
          {...users}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User
                key={user._id}
                onUserChange={handleUserChange}
                onChangeStatus={changeStatus}
                {...user}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={qtyPeople}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    )
  )
}

export default UsersList
