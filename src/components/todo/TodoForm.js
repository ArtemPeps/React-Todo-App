import React from 'react'

export const TodoForm = (props) => (
  <form onSubmit={props.handleSubmit} className="form-inline">
    <input type="text"
      placeholder="Enter task..."
      className="form-control inputForm"
      onChange={props.handleInputChange}
      value={props.currentTodo} />

    <select className="form-control"
      onChange={props.handleProjectChange}>
      <option disabled={true} selected={true}>Choose project</option>
      {
        props.projects.map(el =>
          <option value={el} key={el}> {el} </option>)
      }
    </select>
    <button className="form-control"
      onClick={props.handleSubmit}>Start</button>
  </form>)

TodoForm.propTypes = {
  currentTodo: React.PropTypes.string.isRequired,
  currentProject: React.PropTypes.string.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}
