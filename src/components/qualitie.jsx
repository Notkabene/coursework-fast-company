import React from 'react'

const Quality = ({ qualities }) => {
  return qualities.map((quality) => (
    <span key={quality._id} className={'badge m-1 bg-' + quality.color}>
      {quality.name}
    </span>
  ))
}
export default Quality
