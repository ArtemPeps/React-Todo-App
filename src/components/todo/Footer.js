import React from 'react'
import {Link} from '../router'
import {partial} from '../../lib/utils'

export const Footer = (props) => {
  const handleRemoveCompleted = partial(props.handleRemoveCompleted, props.id)
  return (
    <div >
    <div className='links'>
      <Link  to='/'>All</Link>
      <Link  to='/active'>Active</Link>
      <Link  to='/complete'>Completed</Link> 
    </div>
    <div>
      <hr/>
      <button onClick={handleRemoveCompleted} className="form-control btn-default">Clear completed</button>
    </div>
    </div>
   
  )
}
