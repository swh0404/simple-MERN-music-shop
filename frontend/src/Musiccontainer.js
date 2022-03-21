import React, { Component } from 'react';
import Musiccontent from './Musiccontent'
import Musicdetail from './Musicdetail'
import $ from 'jquery';
import {  Link, Route, Switch } from 'react-router-dom';

class Musiccontainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showing:"",
    musics : null,
    keyword : '',
    detail: null,
    inputValue: null,
    musicid: null, rawmusic: null
    }
    this.getmusics = this.getmusics.bind(this)
    this.viewmusic = this.viewmusic.bind(this)
    this.searchmusic = this.searchmusic.bind(this)
    this.musicdetail = this.musicdetail.bind(this)
    this.seedetail = this.seedetail.bind(this)
  }
  



  viewmusic(data,key){
    return(
      <Musiccontent music= {data} key={key} detail={this.musicdetail}/>
    )
  }

  musicdetail(image, clip, data){
    console.log(data)
    this.setState((prevState, props) => {
      return  {detail: {image: image,  clip: clip, data:data}};
    });
    this.props.showdetail()
    
  }

  searchmusic(){
    let wordlist = this.props.search.split(' ')
    console.log(wordlist)
    $.ajaxSetup({xhrFields: { withCredentials: true } });
    $.post('http://localhost:3001/search',
      {
        "word": wordlist
      },
      function(data, status){
        console.log(data.msg)
        let li = []
        for (var i=0;i<data.msg.length;i++){
            li.push(this.viewmusic(data.msg[i],i))
        }
        this.setState((prevState, props) => {
          return  {musics: li, rawmusic: data.msg};
          });
        }.bind(this));
  }

  seedetail(){
    let li = <Musicdetail data={this.state.detail.data} image={this.state.detail.image} clip={this.state.detail.clip}/>
    this.setState((prevState, props) => {
      return {showing: this.props.type, keyword : this.props.search, musics: li, inputValue: null};
    });
    console.log("seedetail()")
  }

  getmusics(){
    if(this.state.showing === this.props.type && this.state.keyword === this.props.search){

    }
    else if(this.props.type === "detail"){
      console.log("generate detail")
      console.log(this.props)
      this.seedetail()
    }
    else if(this.props.type === "search"){
      this.searchmusic()
      this.setState((prevState, props) => {
        return {showing: this.props.type, keyword : this.props.search};
      });
    }
    else{
      $.ajaxSetup({xhrFields: { withCredentials: true } });
      $.post('http://localhost:3001/musiccat',
      {
        "cat": this.props.type
      },
      function(data, status){
        let li = []
        for (var i=0;i<data.msg.length;i++){
            li.push(this.viewmusic(data.msg[i],i))
        }
        this.setState((prevState, props) => {
          return {showing: this.props.type, musics: li, keyword : this.props.search, rawmusic: data.msg };
          });
        }.bind(this));
      }
    return (this.state.musics)
  }

  render() {
    let position = ""
    let smallCat = ""
    let arrow = ""
    if(this.props.type === "all"){
      position = "All Music"
    }
    else if(this.props.type === "search"){
      position = "Search Results"
    }
    else if(this.props.type === "detail"){
      position = " "
      console.log("detail page"+this.props)
    }
    else{
      arrow = ">"
      smallCat = this.props.type
      position = "All "+this.props.type
      
    }
    if(this.props.type === "detail"){

    }

    return(
      <div id = "Musiccontain">
        <div class="homeBtnGroup">
          <button onClick = {this.props.default}> Home </button>
          <div class= "arrow">{arrow}</div>
          <div class="smallCat">{smallCat}</div>
        </div>
        <h1>{position}</h1>
        <div><this.getmusics/></div>
      </div>
    ); 
  }
}

export default Musiccontainer;