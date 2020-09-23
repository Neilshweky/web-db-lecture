import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import TodoRow from './TodoRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      addTodo: '',
      filter: '',
    };

    this.addTodoSubmit = this.addTodoSubmit.bind(this);
    this.filterTodosSubmit = this.filterTodosSubmit.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch('http://localhost:8080/listtodos', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((todoList) => {
        let todoDivs = todoList.map((todoItem) => <TodoRow key={todoItem.title} todo={todoItem} />);

        this.setState({
          todos: todoDivs,
        });
      })
      .catch((err) => console.log(err));
  }

  addTodoSubmit() {
    if (!this.state.addTodo) return;
    fetch('http://localhost:8080/addtodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: this.state.addTodo }),
    })
      .then((res) => {
        this.setState({ addTodo: '' });
        window.location.reload();
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  filterTodosSubmit() {
    fetch('http://localhost:8080/listtodos?completed=' + this.state.filter, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((todoList) => {
        let todoDivs = todoList.map((todoItem) => <TodoRow key={todoItem.title} todo={todoItem} />);

        this.setState({
          todos: todoDivs,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <PageNavbar active='Todos' />
        <div style={{ display: 'flex', flexFlow: 'column' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexFlow: 'column',
            }}>
            <div>
              <label htmlFor='addtodo'>Add Todo:</label>
              <input
                type='text'
                id='addtodo'
                name='addtodo'
                value={this.state.addTodo}
                onChange={(e) => this.setState({ addTodo: e.target.value })}
              />
              <button type='button' onClick={this.addTodoSubmit}>
                Add
              </button>
            </div>
            <br />
            <div>
              <p style={{ margin: 0 }}>
                <b>Filters</b>
              </p>
              <input
                type='radio'
                id='default'
                name='status'
                onClick={() => this.setState({ filter: '' })}
              />
              <label htmlFor='default'>Default</label>
              <br />
              <input
                type='radio'
                id='done'
                name='status'
                onClick={() => this.setState({ filter: true })}
              />
              <label htmlFor='done'>Done</label>
              <br />
              <input
                type='radio'
                id='notdone'
                name='status'
                onClick={() => this.setState({ filter: false })}
              />
              <label htmlFor='notdone'>Not Done</label>
              <br />
              <button type='button' onClick={this.filterTodosSubmit}>
                Filter
              </button>
            </div>
            <br />
            <br />
            <div>{this.state.todos}</div>
          </div>
        </div>
      </div>
    );
  }
}
