import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this)
    this.gocreate = this.gocreate.bind(this)
    this.checkloginfail = this.checkloginfail.bind(this)
    this.state = {Loginfail: false};
    this.search = this.search.bind(this)
  }

  search(){
    this.props.history.replace('/music');
  }

  gocreate(e){
    console.log("try to create!")
    this.props.history.replace('/create');
  }

  handleAddFormSubmit(e){
    //   alert(e.target.userid.value)
    if(e.target.userid.value === '' || e.target.pw.value === '' ){
      alert("Please do not leave the fields empty ")
    }
    else{
      $.ajaxSetup({xhrFields: { withCredentials: true } });
      $.post("http://localhost:3001/login",
      {
        "userid" : e.target.userid.value,
        "pw" : e.target.pw.value
      },
      function(data, status){
        if(data.msg === 'login'){
            this.props.history.replace('/music');
        }
        else if(data.err === ''){
            this.setState( (prevState, props) => {
              return {Loginfail: true};
              });              
            console.log(this.state.Loginfail)
            setTimeout(()=> this.setState( (prevState, props) => {
              return {Loginfail: false};
              }),3000);
        }
        else{
          alert("err:",data.err)
        }
      }.bind(this)
      );
    }
    e.preventDefault();
  }
  
  checkloginfail(){
    if(this.state.Loginfail){
      return(<h1>Invalid login, please login again.</h1>)  
    }
    else{
      return(
      <div id="login">
        <h2>US Music Shop - Login</h2>
        <form id="loginForm" onSubmit={this.handleAddFormSubmit} >
        <label>Username: </label>
        <input type="text" name="userid" placeholder="Username" required/>
        <br/>
        <label>Password: </label>
        <input type="password" name="pw" placeholder="Password" required/>
        <br/>
        <button type="submit">Submit</button>
        <button onClick={this.gocreate}>Create</button>
        </form>
      </div>
      )
    }
  }

    

  render() {
    return(
      <><Header search={this.search} history={this.props.history}/><this.checkloginfail /></>
    ); 
  }
}

export default Login;
