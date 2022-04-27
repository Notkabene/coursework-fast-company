// import React from 'react'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import Loader from '../utils/loader'
import QualitiesList from '../components/qualitiesList'
import { Link } from 'react-router-dom'

const UserInfo = ({ id }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    api.users
      .getById(id)
      .then(data => setUser(data))
  }, [])

  if (user) {
    return <div className='d-inline-flex flex-column m-4 border border-secondary p-3 shadow'>
      <div className='mb-2'>
        <span className='me-2 fw-bold'>Имя</span>
        <span className='link-primary'>{user.name}</span>
      </div>
      <div className='mb-2'>
        <span className='me-2 fw-bold'>Профессия:</span>
        <span className='link-primary'>{user.profession.name}</span>
      </div>
      <div className='d-flex mb-2'><QualitiesList qualities={user.qualities} /></div>
      <div className='mb-2'>
        <span className='me-2 fw-bold'>Кол-во встреч</span>
        <span className='link-primary'>{user.completedMeetings}</span>
      </div>
      <div className='mb-2'>
        <span className='me-2 fw-bold'>Рейтинг</span>
        <span className='link-primary'>{user.rate}</span>
      </div>
      <Link className='btn btn-outline-success' to='/users'>Все пользователи</Link>
    </div>
  }
  return <Loader/>
}

export default UserInfo

UserInfo.propTypes = {
  id: PropTypes.string
}
