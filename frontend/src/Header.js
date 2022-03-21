import React, { Component } from 'react';
import $ from 'jquery';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this)
    this.updateInputValue = this.updateInputValue.bind(this)
    this.getStatus = this.getStatus.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.goCart =this.goCart.bind(this)
    this.register = this.register.bind(this)
    this.state = {
      inputValue:'',
      buttonlist : '',
      login : ""
    }
  }

  login(){
    this.props.history.replace('/');
  }

  logout(){
    console.log(this.state.login)
    $.ajaxSetup({xhrFields: { withCredentials: true } });
      $.get("http://localhost:3001/logout",
      
      function(data, status){
        if(data.msg ==="logout"){
          if(this.state.login === data.msg){
          }
          else{
            this.setState((prevState, props) => {
              return {login: data.msg };
              });
            this.props.history.replace('/logout'); 
            
          }
        }
        else{
          console.log("failed")
        }
        
      }.bind(this))
  }

  goCart(){
    this.props.history.replace('/cart');
  }
  register(){
    this.props.history.replace('/create');
  }
  getStatus(){
      $.ajaxSetup({xhrFields: { withCredentials: true } });
      $.get("http://localhost:3001/checklogin",
      function(data, status){
        let li = []
        if(data.msg ==="login"){
          li.push(<button key="logout" onClick={this.logout}>Logout</button>)
        }
        else{
          li.push(<button key="register" onClick={this.register}>Register</button>)
          li.push(<button key="login" onClick={this.login}>Sign in</button>)
        }
        if(this.state.login === data.msg){

        }
        else{
          this.setState((prevState, props) => {
            return {login: data.msg , buttonlist : li};
            });
        }
      }.bind(this))
      return (this.state.buttonlist)
  }

  handleAddFormSubmit(){
    this.props.search(this.state.inputValue)
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    return(
      <div className="header" id="headerwrap">
        <div id="searchwrap">
        <input type="text" name="search" placeholder="Keyword(s)" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/> 
        <button type="submit" onClick={this.handleAddFormSubmit}>Search</button>
        </div>
        <div id="buttonwrap">
          <button onClick = {this.goCart}>Cart</button>
          <this.getStatus/>        
        </div>
        
      
      </div>
    ); 
  }
}

export default Header;