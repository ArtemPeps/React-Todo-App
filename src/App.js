import React, { Component } from 'react';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos, removeCompleted} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'



class App extends Component {
  state = {
    todos: [],
    currentTodo: '',
    projects: ["React","React Native", "React/Redux"],
    currentProject: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos: updatedTodos})

  }

  handleRemoveCompleted = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeCompleted(this.state.todos, id)
    this.setState({todos: updatedTodos})
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const newId = generateId()
    const newTodo = {id: newId, name: this.state.currentTodo, project: this.state.currentProject, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo) 
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
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
            handleSubmit={submitHandler}/>
          <TodoList handleToggle={this.handleToggle}
            todos={displayTodos}
            handleRemove={this.handleRemove} />
          <Footer handleRemoveCompleted={this.handleRemoveCompleted}/>
        </div>
      </div>
    );
  }
}

export default App;
