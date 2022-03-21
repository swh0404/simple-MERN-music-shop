import React, { Component } from 'react';
import $ from 'jquery';
import {  Link, Route, Switch } from 'react-router-dom';

class Musiccontent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicid : '',
      musicimage: null,
      musicclip: null
    }
    this.getmedia = this.getmedia.bind(this)
    // this.getclip = this.getclip.bind(this)
    this.godetail = this.godetail.bind(this)
  }

  godetail(){
    console.log("godetail()")
    this.props.detail(this.state.musicimage, this.state.musicclip,this.props.music)
    // this.props.detail(this.state.musicclip, this.props.music)
  }
  getmedia(){
    if(this.state.musicid === this.props.music.MusicId){
    }
    else{
      $.ajaxSetup({xhrFields: { withCredentials: true } });
      $.post('http://localhost:3001/getmusicimage2',
      {
        "music": this.props.music.MusicId
      },
      function(data, status){
        // console.log("Data"+data)
        // console.log(data.image)
        // console.log(data.clip)
        let imgsrc = "data:image/gif;base64," + data.image
        let clipsrc = "data:audio/mp3;base64," + data.clip
        let image = <img src={imgsrc}/>
        let clip = <audio controls muted autoplay class="audio"> <source src={clipsrc} type="audio/mpeg"/></audio>
        this.setState((prevState, props) => {
          // console.log(imgsrc)
          // console.log(clipsrc)
          // console.log(image)
          // console.log(clip)
          return {musicimage : image, musicclip: clip, musicid : this.props.music.MusicId};
        });
        }.bind(this));
    }
    return (<ul>{this.state.musics}</ul>)
  }

  // getclip(){
  //   console.log("getclip()")
  //   if(this.state.musicid === this.props.music.MusicId){
  //   }
  //   else{
  //     $.ajaxSetup({xhrFields: { withCredentials: true } });
  //     $.post('http://localhost:3002/getmusiclip',
  //     {
  //       "music": this.props.music.MusicId
  //     },
  //     function(data, status){
  //       let clipsrc = "data:audio/mp3;base64," + data.clip
  //       let clip = <audio controls autoplay src={clipsrc} type="audio/mpeg" class="audio"/>
  //       this.setState((prevState, props) => {
  //         console.log(clipsrc)
  //         console.log(clip)
  //         return {musicclip : clip, musicid : this.props.music.MusicId};
  //       });
  //       }.bind(this));
  //   }
  //   return (<ul>{this.state.musics}</ul>)
  // }

  render() {
    // this.getmusics();
    // this.getimage()
    // this.getclip()
    this.getmedia()
    let arrival = null
    console.log(this.props)
    if(this.props.music['New Arrival'] === "Yes"){
      console.log("Arrival=yes")
      arrival = <p class="arrival">NEW ARRIVAL!</p>
    }
    return(
      <div className="Musiccontent">
        <div>
        <Link className = "title" onClick={this.godetail}>{this.props.music.MusicName}</Link>
        <br/>
        {this.state.musicimage}
        {/* {this.state.musicclip} */}
        {arrival}
        <p>Composer: {this.props.music.Composer}</p>
        <p>Price: ${this.props.music.Price}</p>
        <br/>
        </div>
      </div> 
    )}
}

export default Musiccontent;