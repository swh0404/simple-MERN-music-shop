import React, { Component } from 'react';
import $ from 'jquery';
import {  Link, Route, Switch } from 'react-router-dom';

class Musicdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    inputValue: null
    }
    this.updateInputValue = this.updateInputValue.bind(this)
    this.order = this.order.bind(this)
  }



  updateInputValue(evt) {
    this.setState((prevState, props) => {
      return {inputValue: evt.target.value};
    });
  }

  order(){
    let quan
    if(this.state.inputValue === null){
      quan = "1"
    }
    else{
      quan = this.state.inputValue
    }
    console.log(this.props.data.MusicId, quan)
    $.ajaxSetup({xhrFields: { withCredentials: true } });
    $.post('http://localhost:3001/order',
      {
        "musicid": this.props.data,
        "num": quan
      },
      function(data, status){
        if(data.msg ==="add"){
          alert("success!")
        }
        else{
          alert("failed!")
        }
      }.bind(this));
  }

  render() {
    console.log("detailender"+this.props.data)
    return(
      <div id="musicDetail">
        <p class="detail-music-name-tag">   {'>'}   {this.props.data.MusicName}</p>
        <h1>{this.props.data.MusicName}</h1>
        {this.props.image}
        {this.props.clip}
        <p>Composer: {this.props.data.Composer}</p>
        <p>Published: {this.props.data.Published}</p>
        <p>Category: {this.props.data.Category}</p>
        <p>Description: {this.props.data.Description}</p>
        <p>Price: ${this.props.data.Price}</p>
        <label>Order: </label>
        <input type="text" value={this.state.inputValue} defaultValue="1" onChange= {(e)=>this.updateInputValue(e)}></input>
        <button onClick={this.order}>Order</button>
      </div>
    ); 
  }
}

export default Musicdetail;