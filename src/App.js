import React, { Component } from 'react';
import './App.css';
import { TodoForm, TodoList, Footer } from './components/todo'
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos, removeCompleted } from './lib/todoHelpers'
import { pipe, partial } from './lib/utils'




class App extends Component {
  state = {
    todos: [],
    currentTodo: '',
    projects: ["React", "React Native", "React/Redux"],
    currentProject: '',
    time: 1,
    timer: '',
    pad: '00:00:00',
    stopTime: '',
    startDate: '',
    stopDate: '',
    toggled: true
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos })

  }

  handleRemoveCompleted = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeCompleted(this.state.todos, id)
    this.setState({ todos: updatedTodos })
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({ todos: updatedTodos })
  }

  handleSubmit = (evt) => {
    /* evt.preventDefault() */
    const stopDate = new Date().toLocaleString('eu', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    const newId = generateId()
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      project: this.state.currentProject,
      stopTime: this.state.pad,
      startDate: this.state.startDate,
      stopDate: this.state.stopDate,
      isComplete: false
    }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    clearInterval(this.state.timer)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: '',
      timer: null,
      time: 0,
      stopDate: stopDate
    })
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please add task name & project'
    })
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    })
  }

  handleProjectChange = (evt) => {
    this.setState({
      currentProject: evt.target.value
    })
  }

  timerFilter = (t) => {
    const seconds = Math.floor(t % 60);
    const minutes = Math.floor(t / 60 % 60);
    const hours = Math.floor(t / 3600 % 60);
    return {
      seconds: seconds,
      minutes: minutes,
      hours: hours
    }
  }

  timerPad = (n, width, z) => {
    z = z || '0';
    n += '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }


  startTimer = (evt) => {
  /*   evt.preventDefault(); */
    const startDate = new Date().toLocaleString('eu', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    this.setState({
      timer: setInterval(() => {
        const seconds = this.timerPad(this.timerFilter(this.state.time).seconds, 2);
        const minutes = this.timerPad(this.timerFilter(this.state.time).minutes, 2);
        const hours = this.timerPad(this.timerFilter(this.state.time).hours, 2);
        const pad = hours + ":" + minutes + ":" + seconds;
        this.setState({
          time: this.state.time + 1,
          pad: pad
        });
      }, 1000),
      startDate: startDate
    })
  }

  buttonToggle = (evt) => {
    evt.preventDefault();
    if(this.state.toggled === true){
      this.startTimer();
    }
    if(this.state.toggled === !true){
      this.handleSubmit();
    }
    this.setState(prevState => ({
       		toggled: !prevState.toggled
       	}));
  }


  render() {
    const submitHandler = this.state.currentTodo && this.state.currentProject ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    
    return (
      <div className="App">
        <div className="Todo-App">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          <TodoForm handleInputChange={this.handleInputChange}
            handleProjectChange={this.handleProjectChange}
            currentTodo={this.state.currentTodo}
            currentProject={this.state.currentProject}
            projects={this.state.projects}
            handleSubmit={submitHandler}
            timerPad={this.state.pad}
            startTimer={this.startTimer}
            buttonToggle={this.buttonToggle}
            toggled={this.state.toggled} />
          <TodoList handleToggle={this.handleToggle}
            todos={displayTodos}
            handleRemove={this.handleRemove}
            startTime={this.state.startTime}
            timeRange={this.state.timeRange}
            stopTime={this.state.pad} />
          <Footer handleRemoveCompleted={this.handleRemoveCompleted} />
        </div>
      </div>
    );
  }
}

export default App;
