import React from 'react'
import {partial} from '../../lib/utils'

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  return (
    <li className="form-inline" >
    <label >
      <div>
     
      <input type="checkbox"
        className="checkbox form-control" 
        onChange={handleToggle}
        checked={props.isComplete}/> <span className="item">{props.name}</span>
         <span className='delete-item'><a href="#" onClick={handleRemove}>&times;</a></span>
        </div>
        </label>
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
