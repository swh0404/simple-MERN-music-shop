import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header'


class Create extends React.Component {
  constructor(props) {
    super(props);
    this.goback= this.goback.bind(this);
    this.checkcreatefail = this.checkcreatefail.bind(this)
    this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this)
    this.state = {Createfail: false, Created: false};
    this.search = this.search.bind(this)
  }


  search(){
    this.props.history.replace('/music');
  }

  goback(e){
    this.setState( (prevState, props) => {
      return {Created: false};
      });  
    this.props.history.replace('/');
  }

  handleAddFormSubmit(e){
    //   alert(e.target.userid.value)
    if(e.target.userid.value === '' || e.target.pw.value === '' ){
      alert("Please do not leave the fields empty ")
    }
    else{
      $.post("http://localhost:3001/create",
      {
        "userid" : e.target.userid.value,
        "pw" : e.target.pw.value
      },
      function(data, status){
        if(data.msg === 'added'){
          this.setState( (prevState, props) => {
            return {Created: true};
            });              
          console.log(this.state.Created)
          setTimeout(()=> this.goback(),3000);
        }
        else{
          this.setState( (prevState, props) => {
            return {Createfail: true};
            });              
          console.log(this.state.Createfail)
          setTimeout(()=> this.setState( (prevState, props) => {
            return {Createfail: false};
            }),3000);
        }
        }.bind(this)
      );
    }
    e.preventDefault();
  }
  
  checkcreatefail(){
    if(this.state.Createfail){
      return(<h1>Account already existed</h1>)  
    }
    if(this.state.Created){
      return(<h1>Account created! Welcome</h1>)  
    }
    else{
      return(
        <div id="login">
        <h2>US Music Shop - Create Account</h2>
        <form id="AccountForm" onSubmit={this.handleAddFormSubmit} >
        <label>Desired Username: </label>
        <input type="text" name="userid" placeholder="Desired Username" required/>
        <br/>
        <label>New password:     </label>
        <input type="password" name="pw" placeholder="New password" required/>
        <br/>
        <button onClick={this.goback} >Back</button>
        <button type="submit">CONFIRM</button>
        </form>
      </div>
      )
    }
  }

    

  render() {
    return(
      <><Header search={this.search} history={this.props.history}/><this.checkcreatefail /></>
    );  
  }
}

export default Create;