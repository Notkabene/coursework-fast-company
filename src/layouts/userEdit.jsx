import React from 'react'
import { useParams } from 'react-router-dom'
import FormData from '../components/common/form/formData'

const UserEdit = () => {
  const params = useParams()
  const { userId } = params

  return <>
    <div className="wrapper shadow rounded m-4 p-4">
      <FormData
        nameForm='Изменить данные'
        nameButton='Изменить'
        userId={userId}
        buttonLinkTo={`/users/${userId}`}
        />

    </div>
  </>
}

export default UserEdit
