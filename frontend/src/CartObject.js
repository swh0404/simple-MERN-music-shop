import React, { Component } from 'react';
import $ from 'jquery';
import {  Link, Route, Switch } from 'react-router-dom';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartid : ''
    }
    this.delete = this.delete.bind(this)
  }

  delete(){
    this.props.delete(this.state.cartid);
  }
  render() {
    if(this.state.cartid === this.props.data._id){

    }
    else{
      this.setState((prevState, props) => {
        return {cartid :  this.props.data._id};
        });
    }
    return(
      <div className="CartObj">
        <div>
        <span>Music Name: </span>
        <span>{this.props.data.MusicId.MusicName}</span>
        <br/>
        <p>Quantity: {this.props.data.Quantity}</p>
        <br/>
        <button onClick = {this.delete}>Delete</button>
        </div>
      </div> 
    )}
}

export default Cart;