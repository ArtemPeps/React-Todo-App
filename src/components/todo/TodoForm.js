import React from 'react'

export const TodoForm = (props) => (
  <form  className="form-inline">
    <input type="text"
      autoFocus={true}
      placeholder="Enter task..."
      className="form-control inputForm"
      onChange={props.handleInputChange}
      value={props.currentTodo} />

    <select className="form-control"
      onChange={props.handleProjectChange}
      defaultValue={"val"}>
      <option disabled={true} value={"val"} >Choose project</option>
      {
        props.projects.map(el =>
          <option value={el} key={el}> {el} </option>)
      }
    </select>
    <div className="form-control">{props.timerPad}</div>
    <button className="form-control"
      onClick={props.startTimer}>Start</button>
    <button className="form-control"
      onClick={props.handleSubmit }>Stop</button>
  </form>)

TodoForm.propTypes = {
  currentTodo: React.PropTypes.string.isRequired,
  currentProject: React.PropTypes.string.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}
