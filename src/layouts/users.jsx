import React from 'react'
import UsersListPage from '../components/page/usersListPage/usersListPage'
import { useParams } from 'react-router-dom'
import UserInfo from '../components/page/userInfo/userInfo'

const Users = () => {
  const params = useParams()
  const { userId } = params
  return <>
    {userId ? <UserInfo id={userId} /> : <UsersListPage />}
  </>
}

export default Users
