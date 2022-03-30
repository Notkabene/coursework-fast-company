import React, {useState} from "react";

const Qality = props => {

  const getQualitiesClasses = (item) => {
    let classes = 'badge m-1 '
    classes += `bg-${item[1].color}`
    return classes
  }

  const qualitiesList = Object.entries(props.qualities)

  return qualitiesList.map(quality => (
        <span
          key={quality[1]._id}
          className={getQualitiesClasses(quality)}
        >
          {quality[1].name}
        </span>
  ))
}
export default Qality