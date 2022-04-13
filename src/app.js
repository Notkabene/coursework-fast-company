import React, { useState, useEffect } from 'react'
import UsersList from './components/usersList'
import api from './api'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  return <UsersList
  usersList={Object.values(users)}
  setUsers={setUsers}
  />
}

export default App
