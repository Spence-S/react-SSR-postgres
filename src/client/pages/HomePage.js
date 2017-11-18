import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginVal: '',
      passwordVal: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPrivateData = this.getPrivateData.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.loginUser(this.state.loginVal, this.state.passwordVal);
  }

  async getPrivateData() {
    const res = await axios.get('/api/private');
    console.log(res);
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
          <label>Password</label>
          <input
            name="passwordVal"
            value={this.state.passwordVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <div>
          <button onClick={this.getPrivateData}>Get Private Data!</button>
        </div>
      </div>
    );
  }
}

export default { component: connect(null, { loginUser })(Home) };
