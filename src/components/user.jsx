import React from 'react'
import Quality from './qualitie'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

const User = ({ _id, name, profession, completedMeetings, rate, onUserChange, bookmark, onChangeStatus, qualities }) => {
  return (
    <tr key={_id} className="">
      <td>{name}</td>
      <td>
        {qualities.map((qual) => (
          <Quality {...qual} key={qual._id} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark
          status={bookmark}
          onClick={() => {
            onChangeStatus(bookmark, _id)
          }}
         />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onUserChange(_id)}
        >
          delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool,
  onUserChange: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired
}

export default User
