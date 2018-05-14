import React from 'react'
import { partial } from '../../lib/utils'

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  return (
    <tr>
  <td>
    <input type="checkbox"
      className="checkbox form-control"
      onChange={handleToggle}
      checked={props.isComplete} /> </td>
  <td className="item">{props.name} </td>
  <td className="item">{props.project}</td>
  <td className='delete-item'><a href="#" onClick={handleRemove}>&times;</a></td>
  </tr>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
