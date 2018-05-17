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
    time: 0,
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

  handleSubmit = () => {
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
      pad:'00:00:00',
      timer: null,
      time: 0
    })
  }

  handleEmptySubmit = () => {
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

  getDate = () => {
     const date = new Date().toLocaleString('eu', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    return date;
  }


  startTimer = (evt) => {
    this.setState({
      timer: setInterval(() => {
        const seconds = this.timerPad(this.timerFilter(this.state.time+1).seconds, 2);
        const minutes = this.timerPad(this.timerFilter(this.state.time).minutes, 2);
        const hours = this.timerPad(this.timerFilter(this.state.time).hours, 2);
        const pad = hours + ":" + minutes + ":" + seconds;
        this.setState({
          time: this.state.time + 1,
          pad: pad,
          stopDate: this.getDate()
        });
      }, 1000),
      startDate: this.getDate()
    })
  }

  buttonToggle = (evt) => {
    evt.preventDefault();
    if(this.state.toggled){
      if(this.state.currentTodo && this.state.currentProject){
        this.startTimer();
        this.setState(prevState => ({
          toggled: !prevState.toggled
        }));
      }
      else {
        this.handleEmptySubmit();
      }
    }
    if(!this.state.toggled){
      this.handleSubmit();
      this.setState(prevState => ({
        toggled: !prevState.toggled,
        
      }));
    }
  }
  render() {
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="Todo-App">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          <h1>React tracking app</h1 >
          <TodoForm handleInputChange={this.handleInputChange}
            handleProjectChange={this.handleProjectChange}
            currentTodo={this.state.currentTodo}
            currentProject={this.state.currentProject}
            projects={this.state.projects}
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
