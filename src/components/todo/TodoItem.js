import React from 'react'
import { partial } from '../../lib/utils'

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  return (
    <tr>
      <td className="checkItem">
        <input type="checkbox"
          className="checkbox form-control"
          onChange={handleToggle}
          checked={props.isComplete} /> </td>
      <td className="item todoItem">{props.name} </td>
      <td className="item projectItem">{props.project}</td>
      <td className="item timeItem">{props.stopTime}</td>
      <td className="item rangeItem">{props.stopDate+" - "+props.startDate}</td>
      <td className='item deleteItem'> 
        <button className="continueButton" onClick={handleRemove} >
          <i className="fas fa-times"></i>
        </button>
        <button className="continueButton" >
          <i className="fa fa-play-circle"></i>
        </button>
      </td>
    </tr>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
