import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        Hello Big World!
        <button onClick={() => console.log('I was clicked!')}> Clik me </button>
      </div>
    );
  }
}

export default { component: Home };
