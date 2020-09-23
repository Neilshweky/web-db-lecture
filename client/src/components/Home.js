import React from 'react'; // Required: Always import react
import 'bootstrap/dist/css/bootstrap.min.css'; // Optional: CSS styling import
import PageNavbar from './PageNavbar'; // Import component located in a different file

// Define class component
export default class Home extends React.Component {
  // If you are maintaining state or need to use props, create a constructor as follows
  constructor(props) {
    super(props);

    this.state = {
      OpeningText: 'Welcome',
    };

    //Binding is necessary for any function you define that needs to access "this"
    this.checkOpeningText = this.checkOpeningText.bind(this);
  }

  /* Function we define for button click.
    If the current value of our state field 'OpeningText' is 'Welcome'
    then we set the state with setState and change OpeningText to 'WELCOME'
    else we set the state as 'Welcome' */
  checkOpeningText() {
    if (this.state.OpeningText === 'Welcome') {
      this.setState({ OpeningText: 'WELCOME' });
    } else {
      this.setState({ OpeningText: 'Welcome' });
    }
  }

  // Render function needed to display HTML. Every time the page is reloaded, render is called
  render() {
    // 1 method of defining CSS styling is creating a JSON object with CSS attributes
    const welcomeStyle = {
      textAlign: 'center',
      backgroundColor: 'lightgray',
      margin: 0,
    };

    /* Embed Javascript Code into HTML with {} and putting code into { code here }. 
      Below you will see several examples of Javascript being directly embedded into the HTML*/
    return (
      <div>
        <PageNavbar active='Home' />
        <p style={welcomeStyle}>
          {this.state.OpeningText} to the React tutorial! We're going to make a simple todo list.
        </p>
        {/* Define a function to execute when the button is clicked */}
        <button type='button' onClick={this.checkOpeningText}>
          Change
        </button>
      </div>
    );
  }
}
