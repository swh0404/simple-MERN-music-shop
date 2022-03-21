import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header'
import CartObj from './CartObject'
import {  Link, Route, Switch } from 'react-router-dom';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart : null,
      number : 0,
      user : '',
      price :0
    }
    this.getcart = this.getcart.bind(this)
    this.vieworder = this.vieworder.bind(this)
    this.back = this.back.bind(this)
    this.search = this.search.bind(this)
    this.delete = this.delete.bind(this)
    this.checkout = this.checkout.bind(this)
  }

  search(){
    this.props.history.replace('/music');
  }
  checkout(){
    this.props.history.replace('/checkout');
  }

  vieworder(data, key){
    return(
      <CartObj data={data} delete={this.delete} key={key}/>
    )
  }

  delete(cart){
    console.log("delete", cart)
    $.ajaxSetup({xhrFields: { withCredentials: true } });
      $.post('http://localhost:3001/delorder',
      {
        "id":cart
      },
      function(data,status){
        this.setState((prevState, props) => {
          return {number: data.msg.length-1 };
      });
      }.bind(this))
  }

  back(){
    this.props.history.replace('/music');
  }

  getcart(){
      $.ajaxSetup({xhrFields: { withCredentials: true } });
      $.get('http://localhost:3001/cart',
      function(data, status){
        let li = []
        let price = 0 
        for (var i=0;i<data.msg.length;i++){
          li.push(this.vieworder(data.msg[i],i))
          // console.log(data.msg[i].MusicId)
          price = price +parseInt(data.msg[i].Quantity)*parseInt(data.msg[i].MusicId.Price)
        }
        if(data.msg.length > 0){
          var user = data.msg[0].UserID
        }
        else{
          var user = "no user"
        }
        if(this.state.number === data.msg.length && this.state.user === user){

        }
        else{
          this.setState((prevState, props) => {
              return {cart: li, number: data.msg.length, user : user, price : price };
          });
        }
        }.bind(this));
    return (<span>{this.state.cart}</span>)
  }

  render() {
    return(
      <div id="cart">
        <Header search={this.search} history={this.props.history}/>
        <h1>My Shoping Cart</h1>
        <this.getcart/>
        <p>Total Price: ${this.state.price}</p>
        <button onClick={this.back}>Back</button>
        <button onClick = {this.checkout}>Check out</button>
      </div> 
    )}
}

export default Cart;