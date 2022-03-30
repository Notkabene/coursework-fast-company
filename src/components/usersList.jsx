import React, {useState} from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";


const UsersList = () => {
  const users = api.users.fetchAll()
  const [usersList, setUsers] = useState(users)

  const getHeadingClasses = () => {
    let classes = 'badge p-2 mt-1 fs-6 '
    classes += usersList.length === 0 ? 'bg-warning' : 'bg-primary'
    return classes
  }

  const changeStatus = (item) => {
    const updateStatus = usersList.map(user => {
      if(item.bookmark === true) {
        if(user._id === item._id) {
          user.bookmark = false
        }
        return user
      } else {
        if(user._id === item._id) {
          user.bookmark = true
        }
        return user
      }
    })
    setUsers(updateStatus)
  }


  const handleUserChange = id => {
    setUsers(prevState => prevState.filter(item => item._id !== id))
  }
  const test = id => {
    setUsers(prevState => prevState.filter(item => item._id !== id))
  }

  const getHeading = () => {
    const qtyPeople = usersList.length

    let arr = qtyPeople.toString().split('').reverse()
    let peopleVariant = () => {
      const checkLastNumber = arr[0] > 1 && arr[0] < 5
      return (checkLastNumber && qtyPeople > 20) || (qtyPeople < 10 && checkLastNumber)
          ? "человека"
          : "человек"
    }

    return usersList.length !== 0
        ? ` ${qtyPeople} ${peopleVariant()} тусанет с тобой сегодня`
        : 'Никто не тусанет с тобой сегодня'
  }

  return usersList.length !== 0
        && <>
          <SearchStatus onClassName={getHeadingClasses} onHeading={getHeading} />
          <table className='table'>
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
            {usersList.map(user => (
                <User key={user._id} onUserChange={handleUserChange} onChangeStatus={changeStatus}  {...user}/>
            ))}
            </tbody>
          </table>
        </>
}

export default UsersList
