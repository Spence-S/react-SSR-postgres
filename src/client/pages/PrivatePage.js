import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPrivateData } from '../actions';

class PrivatePage extends Component {
  componentDidMount() {
    this.props.fetchPrivateData();
  }

  renderPrivateData() {
    return this.props.privateData;
  }

  render() {
    return (
      <div>
        <h3>Private Page!</h3>
        {this.renderPrivateData()}
      </div>
    );
  }
}

function mapStateToProps({ privateData }) {
  return { privateData };
}

export default {
  component: connect(mapStateToProps, { fetchPrivateData })(PrivatePage),
  loadData: ({ dispatch }) => dispatch(fetchPrivateData())
};
