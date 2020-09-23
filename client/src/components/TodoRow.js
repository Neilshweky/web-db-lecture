import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TodoRow extends React.Component {
  constructor(props) {
    super(props);

    /* props contains any parameters that were passed in from a different component 
      In this case the parameter "todo" was passed in. todo is a JSON that look like this:
      {
        title: 'title'
        completed: boolean
      } 
    */
    this.state = {
      completed: this.props.todo.completed,
    };

    this.editTodoSubmit = this.editTodoSubmit.bind(this);
    this.deleteTodoSubmit = this.deleteTodoSubmit.bind(this);
    this.checkCompleted = this.checkCompleted.bind(this);
    this.updateTodoStatusButton = this.updateTodoStatusButton.bind(this);
  }

  // Example of a PUT. Updating data within SQL and reflecting that change on the client
  editTodoSubmit() {
    fetch('http://localhost:8080/updatetodo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.props.todo.title,
        completed: !this.state.completed, //If the task is complete and we click the button, we want to make the task incomplete
      }),
    })
      .then((res) => {
        this.setState({ completed: !this.state.completed }); // If the response is successful then we update local client state to reflect changes
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  // Example of delete
  deleteTodoSubmit() {
    fetch('http://localhost:8080/deletetodo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.props.todo.title,
      }),
    })
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  }

  checkCompleted() {
    if (this.state.completed) return 'Done';
    else return 'Not Done';
  }

  updateTodoStatusButton() {
    if (this.state.completed) return 'Uncomplete the Task';
    else return 'Complete the Task';
  }

  render() {
    const style = {
      borderStyle: 'solid',
      borderWidth: '2px',
      borderColor: 'black',
      backgroundColor: 'lightblue',
      width: '350px',
      height: '100px',
    };

    return (
      <div style={style}>
        <div>
          <b>Task:</b> {this.props.todo.title}
        </div>
        <div>
          <b>Status:</b> {this.checkCompleted()}
        </div>
        <button type='button' onClick={this.editTodoSubmit}>
          {this.updateTodoStatusButton()}
        </button>
        <button type='button' onClick={this.deleteTodoSubmit}>
          Delete Todo
        </button>
      </div>
    );
  }
}
