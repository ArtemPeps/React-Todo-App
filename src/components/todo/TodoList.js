import React from 'react'
import {TodoItem} from './TodoItem'


export const TodoList = (props) => {
 
  return (
    <table className="table table-md">
      <thead>
        <tr>
          <th>Status</th>
          <th>Task</th>
          <th>Project</th>
          <th>Time spent</th>
          <th>Time range</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
      {props.todos.map(todo => 
         <TodoItem handleToggle={props.handleToggle}
                   key={todo.id} 
                   {...todo}
                   handleRemove={props.handleRemove} 
         />)}
      </tbody>
    </table>
  )
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired
}
