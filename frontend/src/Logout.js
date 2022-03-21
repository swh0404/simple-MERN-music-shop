import React, { Component } from 'react';
import $ from 'jquery';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    setTimeout(()=> this.props.history.replace('/music'),3000);
    return(
      <h2>Logging out</h2>
    )
  }
}

export default Logout;