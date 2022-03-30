import React, {useState} from "react";

const Bookmark = props => {

  const users = [props]

  const handleBookmark = users.map(user => {
    let classes = 'bi '
    return classes += user.bookmark ?  'bi-bookmark-fill' : 'bi-bookmark'
  })

  return <i className={handleBookmark} onClick={()=>{props.onChangeStatus(props)}}></i>
}
export default Bookmark