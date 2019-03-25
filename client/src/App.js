import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let tagline_options = [
  "sew moist seeds",
  "for sustained propagation",
  "blue ribbon results",
  "succulence for your succulents",
  "promotes vigorous growth",
  "photo _sin_ thesis",
  "grow moister",
  "don't let your moistness surprise you",
  "keep your pot as wet as you please",
  "a moist pot is a happy pot",
  "don't just be dirty. be dirty AND moist",
  "stay on top of your moistness",
  "put your moisture in the cloud",
  "we want to get you wet... _down there_",
  "for a happy, healthy bush",
];

let background_image_options = [
  "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134100.jpg",
  "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134103.jpg",
  "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134105.jpg",
  "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134254.jpg",
  "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134255.jpg",
  "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134300.jpg",
];

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

class App extends Component {
  render() {
    return (
      <div className="App" style={{backgroundSize: "cover", backgroundImage:`url("${choose(background_image_options)}")`}}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Moistly Wet</h2>
          <div>{choose(tagline_options)}</div>
        </header>
      </div>
    );
  }
}

export default App;
