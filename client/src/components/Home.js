import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';

export default class Dashboard extends React.Component {
  render() {
    const welcomeStyle = {
      textAlign: 'center',
      backgroundColor: 'lightgray',
      margin: 0,
    };

    return (
      <div>
        <PageNavbar active='Home' />
        <p style={welcomeStyle}>
          Welcome to the React tutorial! We're going to make a simple todo list.
        </p>
      </div>
    );
  }
}
