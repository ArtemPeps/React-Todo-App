import React from 'react'

export const TodoForm = (props) => (
  <form className="form-inline mainForm form-group">
    <input type="text"
      autoFocus={false}
      placeholder="Enter task..."
      className="inputForm form-control-lg"
      onChange={props.handleInputChange}
      value={props.currentTodo} />

    <select className="custom-select form-control-lg"
    onChange={props.handleProjectChange}
      defaultValue={"val"}>
      <option disabled={true} value={"val"}>Choose project</option>
      {
        props.projects.map(el =>
          <option value={el} key={el}> {el} </option>)
      }
    </select>
  
    {/* <select className="form-control-lg selectForm"
      onChange={props.handleProjectChange}
      defaultValue={"val"}>
      <option disabled={true} value={"val"}>Choose project</option>
      {
        props.projects.map(el =>
          <option value={el} key={el}> {el} </option>)
      }
    </select> */}
    <div className="form-control-lg pad">{props.timerPad}</div>

    <label type="button" className={props.toggled ?
      "btn-success form-control-lg active" :
      "btn-danger form-control-lg active"}
      onClick={props.buttonToggle}>
      {props.toggled ? "Start" : "Stop"}
    </label>
  </form>)

TodoForm.propTypes = {
  currentTodo: React.PropTypes.string.isRequired,
  currentProject: React.PropTypes.string.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
}
