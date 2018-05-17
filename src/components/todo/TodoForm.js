import React from 'react'

export const TodoForm = (props) => (
  <form  className="form-inline mainForm">
    <input type="text"
      autoFocus={true}
      placeholder="Enter task..."
      className="inputForm form-control"
      onChange={props.handleInputChange}
      value={props.currentTodo} />

    <select className="form-control selectForm"
      onChange={props.handleProjectChange}
      defaultValue={"val"}>
      <option disabled={true} value={"val"}>Choose project</option>
      {
        props.projects.map(el =>
          <option value={el} key={el}> {el} </option>)
      }
    </select>
    <div className="form-control pad">{props.timerPad}</div>

      	<button className={props.toggled ? "btn-success form-control active" : "btn-danger form-control active"} onClick={props.buttonToggle}>
				{props.toggled ? "Start" : "Stop"}
			</button>
  </form>)

TodoForm.propTypes = {
  currentTodo: React.PropTypes.string.isRequired,
  currentProject: React.PropTypes.string.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
}
