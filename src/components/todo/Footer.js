import React from 'react'
import {partial} from '../../lib/utils'

export const Footer = (props) => {
  const handleRemoveCompleted = partial(props.handleRemoveCompleted, props.id)
  return (
    <div>
      <hr/>
      <button onClick={handleRemoveCompleted} className="form-control btn-primary btn-block">Clear completed</button>
    </div>

   
  )
}
