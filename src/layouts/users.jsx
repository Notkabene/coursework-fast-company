import React from 'react'
import UsersList from '../components/usersList'
import { useParams } from 'react-router-dom'
import User from '../layouts/userInfo'

const Users = () => {
  const params = useParams()
  const { userId } = params
  return <>
    {userId ? <User id={userId} /> : <UsersList />}
  </>
}

export default Users
