import React from 'react'

export const TodoForm = (props) => (
  <form onSubmit={props.handleSubmit} className="">
    <input type="text"
      placeholder="Enter task..."
      className="form-control inputForm"
      onChange={props.handleInputChange}
      value={props.currentTodo}/>
  </form>)

  TodoForm.propTypes = {
    currentTodo: React.PropTypes.string.isRequired,
    handleInputChange: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }
