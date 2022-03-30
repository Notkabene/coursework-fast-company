import React, {useState} from "react";
import Qality from "./qualitie";
import Bookmark from "./bookmark";

const User = props => {
  const users = [props]

  return  users.length !== 0
        && users.map(user => (
            <tr key={user._id} className=''>
              <td>{user.name}</td>
              <td><Qality {...user}/></td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}/5</td>
              <td><Bookmark  {...user}/></td>
              <td>
                <button
                    className='btn btn-danger btn-sm'
                    onClick={() => props.onUserChange(user._id)}
                >
                  delete
                </button></td>
            </tr>
        ))
}
export default User