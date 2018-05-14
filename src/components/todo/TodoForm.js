import React from 'react'

export const TodoForm = (props) => (
  <form onSubmit={props.handleSubmit} className="form-inline">
    <input type="text"
      placeholder="Enter task..."
      className="form-control inputForm"
      onChange={props.handleInputChange}
      value={props.currentTodo}/>
      <select
            onChange={props.handleProjectChange}
            value={props.currentProject}
            className="form-control">
            <option>Select project</option>
            <option>Proj2</option>
            <option>Proj3</option>
        </select>
         <button className="form-control"
                onClick={props.handleSubmit}>Start</button> 
  </form>)

  TodoForm.propTypes = {
    currentTodo: React.PropTypes.string.isRequired,
    handleInputChange: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }
