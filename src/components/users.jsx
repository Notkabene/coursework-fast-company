import React, {useState} from "react";
import api from "../api";


const Users = () => {
  const users = api.users.fetchAll()
  const [usersList, setUsers] = useState(users)

  const getHeadingClasses = () => {
    let classes = 'badge p-2 mt-1 fs-6 '
    classes += usersList.length === 0 ? 'bg-warning' : 'bg-primary'
    return classes
  }

  const getQualitiesClasses = (item) => {
    let classes = 'badge m-1 '
    classes += `bg-${item[1].color}`
    return classes
  }

  const handleUserChange = id => {
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

  const renderQualities = (qualities) => {
    const qualitiesEntries = Object.entries(qualities)

    return qualitiesEntries.map(item => (
        <span
            key={item[1]._id}
            className={getQualitiesClasses(item)}
        >{item[1].name}</span>
    ))
  }


  const renderUser = () => {

    return usersList.length !== 0
        && usersList.map(user => (

      <tr key={user._id} className=''>
        <td>{user.name}</td>
        <td>{renderQualities(user.qualities)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td>
          <button
            className='btn btn-danger btn-sm'
            onClick={() => handleUserChange(user._id)}
          >
          delete
          </button></td>
      </tr>
    ))
  }

  const renderHeadTable = () => {
    return usersList.length !== 0
        && <>
          <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>{renderUser()}</tbody>
        </>
  }

  return (
      <>
        <span className={getHeadingClasses()}>{getHeading()}</span>
        <table className='table'>{renderHeadTable()}</table>
      </>

  )
}

export default Users