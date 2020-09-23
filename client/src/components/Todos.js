import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import TodoRow from './TodoRow';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [], // Todo divs will be stored here for display
      addTodo: '', // String value of textbox
      filter: '', // Current filter value ('' -> no filter, true -> filter for completed, false -> filter for incomplete)
    };

    this.addTodoSubmit = this.addTodoSubmit.bind(this);
    this.filterTodosSubmit = this.filterTodosSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // componentDidMount is always called after a render
  componentDidMount() {
    // We will send a GET request with the below URL to be able to populate our page with todos
    fetch('http://localhost:8080/listtodos', {
      method: 'GET',
    })
      .then((res) => res.json()) // Shorthand for function(res) { return res.json(); }
      .then((todoList) => {
        // todoList is an array of JSON objects containing all the todo tasks

        /* Define new variable called todoDivs, which will equal the array returned from the map.
          Map iterates through each item in the array todoList and will return a new array 
          with modified contents as specifed in the function */
        let todoDivs = todoList.map(function (todoItem) {
          /* todoItem is a singular JSON object passed in by map.
            When mapping you must specify a unique "key" attribute. 
            Since we know the titles are unique we make them the value of "key".
            "todo" is the parameter we pass into the constructor of component TodoRow. 
            Think of this like we are constructing a new Java Object and passing todoItem 
            into the todo parameter (i.e. return new TodoRow(todoItem.title, todoItem) ) */
          return <TodoRow key={todoItem.title} todo={todoItem} />;
        });

        // Equivalent to the function above, just shorthand
        // let todoDivs = todoList.map((todoItem) => <TodoRow key={todoItem.title} todo={todoItem} />);

        // Set the state of todos
        this.setState({
          todos: todoDivs,
        });
      })
      .catch((err) => console.log(err)); // If the server sends an unsuccessful response the catch will be executed
  }

  // Here, when Add is clicked, we execute this POST request
  // Almost any request type (except GET) you can specify data to be sent through the "body" as seen below
  addTodoSubmit() {
    if (this.state.addTodo === '') return;
    fetch('http://localhost:8080/addtodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: this.state.addTodo }),
    })
      .then((res) => {
        this.setState({ addTodo: '' }); // Reset initial state of addTodo
        window.location.reload(); // Reload the browser window if response was successful
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  /* Almost the same as componentDidMount fetch, but adding query field in the url to get data that is 
    completed=true or completed=false. Everything after the "?" is considered a query field*/
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

  onChange(e) {
    this.setState({ addTodo: e.target.value });
  }

  render() {
    const div2Style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column',
    };

    return (
      <div>
        <PageNavbar active='Todos' />
        <div style={{ display: 'flex', flexFlow: 'column' }}>
          <div style={div2Style}>
            <div>
              <label htmlFor='addtodo'>Add Todo:</label>
              <input
                type='text'
                id='addtodo'
                name='addtodo'
                value={this.state.addTodo}
                onChange={this.onChange}
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
              {/* You can define JS functions directly into HTML. 
                In this case we are saying when the button is clicked set the state of filter */}
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
