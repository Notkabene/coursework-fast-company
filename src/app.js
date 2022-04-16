import React, { useState, useEffect } from 'react'
import UsersList from './components/usersList'
import api from './api'
import Loader from './utils/loader'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  // const messageLoader = <span>Загрузка</span>
  const getLoader = () => {
    const messageLoader = document.querySelector('#loader')
    const status = document.querySelector('#status')
    messageLoader.setAttribute('hidden', '')
    status.removeAttribute('hidden', '')
  }

  useEffect(() => {
    api.users.fetchAll()
      .then((data) => setUsers(data))
      .finally(getLoader)
  }, [])

  return <>
  <Loader onLoader={getLoader}/>
  <UsersList
          usersList={Object.values(users)}
          setUsers={setUsers}
          />
  </>
}

export default App
