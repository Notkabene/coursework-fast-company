import React, {useState} from "react";

const SearchStatus = props => {
 return <span className={props.onClassName()}>{props.onHeading()}</span>
}
export default SearchStatus