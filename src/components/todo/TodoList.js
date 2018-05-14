import React from 'react'
import {TodoItem} from './TodoItem'


export const TodoList = (props) => {

  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>Status</th>
          <th>Task</th>
          <th>Project</th>
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
