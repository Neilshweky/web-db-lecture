import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: this.props.todo.completed,
    };

    this.editTodoSubmit = this.editTodoSubmit.bind(this);
    this.deleteTodoSubmit = this.deleteTodoSubmit.bind(this);
  }

  editTodoSubmit() {
    fetch('http://localhost:8080/updatetodo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.props.todo.title,
        completed: !this.state.completed,
      }),
    })
      .then((res) => {
        this.setState({ completed: !this.state.completed });
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

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
          <b>Status:</b> {this.state.completed ? 'Done' : 'Not Done'}
        </div>
        <button type='button' onClick={this.editTodoSubmit}>
          {this.state.completed ? 'Uncomplete Task' : 'Complete Task'}
        </button>
        <button type='button' onClick={this.deleteTodoSubmit}>
          Delete Todo
        </button>
      </div>
    );
  }
}
