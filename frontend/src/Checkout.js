import React, { Component } from 'react';
import $ from 'jquery';
import {  Link, Route, Switch } from 'react-router-dom';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics : null,
      header: null,
      ac: null,
      login: '',
      user: '',
      price: 0 , 
      form: "form",
      data:null,
      warning : null,
      musicOrderList: ''
    }
    this.backhome = this.backhome.bind(this)
    this.checklogin = this.checklogin.bind(this)
    this.getcart = this.getcart.bind(this)
    this.login = this.login.bind(this)
    this.change = this.change.bind(this)
    this.confirm = this.confirm.bind(this)
    this.checkout = this.checkout.bind(this)
  }

  backhome(){
    // this.state.musicOrderList = ''
    // console.log("backhome()")
    // console.log(this.state.musicOrderList)
    this.setState((prevState, props) => {
      return {form:"form" };
    });
    this.props.history.replace("/music")
  }

  change(){
    this.props.history.replace('/cart')
  }


  getcart(){
    $.ajaxSetup({xhrFields: { withCredentials: true } });
    $.get('http://localhost:3001/cart',
    function(data, status){
      let li = []
      let price=0
      this.state.musicOrderList = ''
      console.log("getcart()")
      for (var i=0;i<data.msg.length;i++){
        console.log(data.msg[i].MusicId.MusicName)
        li.push(
          <div>
            <p>{data.msg[i].Quantity}x {data.msg[i].MusicId.MusicName}  HK$ {data.msg[i].MusicId.Price}</p>
          </div>
        )
        price = price +parseInt(data.msg[i].Quantity)*parseInt(data.msg[i].MusicId.Price)
        this.state.musicOrderList =  this.state.musicOrderList + data.msg[i].Quantity + " x "+ data.msg[i].MusicId.MusicName + " HK$ " +data.msg[i].MusicId.Price + ","
      }
      if(data.msg.length > 0){
        var user = data.msg[0].UserID
      }
      else{
        var user = "no user"
      }
      if(this.state.user === user){

      }
      else{
        this.setState((prevState, props) => {
            return {s: li, price:price, user : user };
        });
      }
      }.bind(this));
      console.log(this.state.musicOrderList)
  return (<ul>{this.state.cart}</ul>)
    }

  checkout(e){
    $.get('http://localhost:3001/checkout',
    function(data, status){
      if(data.msg === "checkout"){
        console.log("checkout")
        console.log(this.state.musicOrderList)
        this.setState((prevState, props) => {
          return {form: "invoice" , data:
        {
          "name":e.target.name.value,
          "address1":e.target.address1.value,
          "city":e.target.city.value,
          "country":e.target.country.value,
          "postcode":e.target.postcode.value,
          "company":(e.target.company.value ==='')?"NA":e.target.company.value,
          "address2":(e.target.address2.value ==='')?"NA":e.target.address2.value,
          "region":(e.target.region.value ==='')?"NA":e.target.region.value,
          "price": this.state.price,
          "musicOrderList": this.state.musicOrderList
        }};
        });
      }
      else{
        console.log(data.err)
      }
    }.bind(this))
  }


  login(){
    this.props.history.replace('/')
  }

  
  checkinput(e){
    if(this.state.login === 'login'){
      if(e.target.name.value === ''||e.target.address1.value === ''||e.target.city.value === ''||
      e.target.country.value === ''||e.target.postcode.value === ''){
        return false
      }
    }
    else{
      if(e.target.name.value === ''||e.target.address1.value === ''||e.target.city.value === ''||
      e.target.country.value === ''||e.target.postcode.value === ''||e.target.userid.value === ''||e.target.pw.value === ''){
        return false
      }
    }
    return true
  }

  confirm(e){
    e.preventDefault();
    let valid = this.checkinput(e)
    if(valid){
      if(this.state.login === 'login'){
        this.setState((prevState, props) => {
          return {warning : null};
          });
        this.checkout(e)
        console.log("confirm")
      }
      else{
        $.post("http://localhost:3001/create",
        {
          "userid" : e.target.userid.value,
          "pw" : e.target.pw.value
        },
        function(data, status){
          if(data.msg === 'added'){
            this.setState((prevState, props) => {
              return {warning : null};
              });
            this.checkout(e)
          }
          else{
            this.setState((prevState, props) => {
              return {warning: <span style={{color:"red"}}>Username Duplicated!</span>, 
              ac: <div>
                <h2>Create Account:</h2>
                <label>Desired Username: </label>
                <input type="text" name="userid" placeholder="Desired Username" required/>
                <span style={{color:"red"}}>Username Duplicated!</span>
                <br/>
                <label>New password:     </label>
                <input type="password" name="pw" placeholder="New password" required/>
                <br/>
                </div>};
              });
              e.target.userid.value = ''
          }
          }.bind(this)
        );
      }
    }
    else{
      alert("Please do not leave the fields empty")
    }
    
  }
  checklogin(){
    $.ajaxSetup({xhrFields: { withCredentials: true } });
      console.log("check login")
      $.get("http://localhost:3001/checklogin",
      function(data, status){
        let li = []
        let ac = []
        if(data.msg ==="login"){
          console.log("return logout button")
          li.push(<div></div>)
        }
        else{
          console.log("return login button")
          console.log(this.state.warning)
          li.push(<div id="checkoutheader" >
            <div id="left">
            <h1>I am new customer</h1>
              <span>Please Checkout below</span>
              <span style={{float:"right"}}>or</span>
            </div>
            <div id="right">
              <h1>I'm already a user</h1>
              <Link onClick={this.login}>Sign in</Link>
            </div>
          </div>)
          ac.push(
            <div>
              <h2>Create Account:</h2>
              <label>Desired Username: </label>
              <input type="text" name="userid" placeholder="Desired Username" required/>
              {this.state.warning}
              <br/>
              <label>New password:     </label>
              <input type="password" name="pw" placeholder="New password" required/>
              <br/>
            </div>
          )
        }
        if(this.state.login === data.msg){

        }
        else{
          this.setState((prevState, props) => {
            return {login: data.msg , header : li, ac:ac};
            });
        }
      }.bind(this))
  }
  render() {
    this.checklogin()
    this.getcart()
    console.log(this.state.musicOrderList)
    if(this.state.form === "form"){
      return(
        <div>
          {this.state.header}
          <form onSubmit={this.confirm} id="checkout" className="checkoutform">
            {this.state.ac}
            <label>Full name </label>
            <input type="text" name="name" required placeholder="Required"></input>
            <br/>
            <label>Company name </label>
            <input type="text" name="company"></input>
            <br/>
            <label>Address line 1 </label>
            <input type="text" name="address1" required placeholder="Required"></input>
            <br/>
            <label>Address line 2 </label>
            <input type="text" name="address2"></input>
            <br/>
            <label>City </label>
            <input type="text" name="city" required placeholder="Required"></input>
            <br/>
            <label>Region/State District </label>
            <input type="text" name="region"></input>
            <br/>
            <label>Country </label>
            <input type="text" name="country" required placeholder="Required" ></input>
            <br/>
            <label>Postcode/ Zip Code </label>
            <input type="text" name="postcode" required placeholder="Required"></input>
            <br/>
            <br></br>
            <span>Your order: (</span> <Link onClick={this.change}>Change</Link><span>)</span>
          <h3>Free Standard Shipping</h3>
          {this.state.musicOrderList}
          <p>Total Price: ${this.state.price}</p>
          <button type="submit">Confirm</button>
          </form>
        </div> 
      )
    }
  else{
    return(
      <div id="checkout">
        <h1>Invoice Page</h1>
        <p>Full name: {this.state.data.name}   Company: {this.state.data.company}</p>
        <p>Address line 1: {this.state.data.address1}</p>
        <p>Address line 2: {this.state.data.address2}</p>
        <p>City: {this.state.data.city}   Region: {this.state.data.region}    Country: {this.state.data.country}</p>
        <p>PostCode: {this.state.data.postcode}</p>
        <br/>
        {this.state.data.musicOrderList}
        <div id="invoicemsg">
        <p>Total Price: ${this.state.data.price}</p>
        <p>Thanks for ordering. Your music will be delivered within 7 working days</p>
        <button onClick = {this.backhome}>OK</button>
        </div>
        
      </div>
    )
  }}
}

export default Checkout;