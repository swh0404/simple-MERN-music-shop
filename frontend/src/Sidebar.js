import React, { Component } from 'react';
import $ from 'jquery';
import { Route, Switch, Link } from 'react-router-dom';


  

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.GetCat = this.GetCat.bind(this)
    this.clickevent = this.clickevent.bind(this)
    this.state = {cat :null}
  }

  clickevent(e){
    this.props.goquery(e.target.dataset.name)
  }
  GetCat() {
    if(this.state.cat === null){
      $.ajaxSetup({xhrFields: { withCredentials: true } });
      $.get('http://localhost:3001/sidebar',
      function(data, status){
        let li = []
        for (var i=0;i<data.msg.length;i++){
            li.push(<li className="Nav__item" key={i}><Link className="Nav__link" data-name={data.msg[i]} onClick = {this.clickevent}>{data.msg[i]}</Link></li>)
        }
        this.setState((prevState, props) => {
          return {cat: li};
          });
      }.bind(this));
    }
    return (this.state.cat)
  }

  render() {
    return(
      <div id="sidebar">
          <h3>Category</h3>
          <div className="Nav__right">
            <this.GetCat />
          </div>
      </div>   
    ); 
  }
}


export default Side;