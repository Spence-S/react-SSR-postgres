import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginVal: '',
      passowordVal: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(this.state.loginVal);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Form was submitted man!');
    this.props.loginUser(this.state.loginVal, this.state.passwordVal);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>login:</label>
          <input
            name="loginVal"
            value={this.state.loginVal}
            onChange={this.handleInputChange}
          />
          <label>Password:</label>
          <input
            name="passwordVal"
            value={this.state.passwordVal}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    );
  }
}

export default { component: connect(null, { loginUser })(Home) };
