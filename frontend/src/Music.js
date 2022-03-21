import React, { Component } from 'react';
import Side from './Sidebar'
import Header from './Header'
import Musiccontainer from './Musiccontainer.js'
import $ from 'jquery';
import {  Route, Switch } from 'react-router-dom';

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showing:"all", search : '', login : ''}
    this.goquery = this.goquery.bind(this)
    this.setdefault = this.setdefault.bind(this)
    this.search = this.search.bind(this)
    this.detail = this.detail.bind(this)
  }
  goquery(name){
    console.log("change parent state")
    this.setState((prevState, props) => {
      return {showing: name, search : ''};
      });
  }

  setdefault(){
    console.log("change to all")
    this.setState((prevState, props) => {
      return {showing: "all"};
      });
  }

  detail(){
    console.log("change to detail")
    this.setState((prevState, props) => {
      return {showing: "detail"};
      });
  }


  search(msg){
    console.log("got msg: ", msg)
    this.setState({search: msg, showing : "search"})
  }

  render() {
    return(
      <div>
        <div id="wholewrap">
          <Header search={this.search} history={this.props.history}/>
          <div id="bottomwrap">
            <Side goquery={this.goquery}/>
            <Musiccontainer type={this.state.showing} default= {this.setdefault} search = {this.state.search} showdetail = {this.detail} price={this.price}/>
 
          </div>
        </div>
      </div>
    ); 
  }
}

export default Music;