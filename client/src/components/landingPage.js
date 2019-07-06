import React, { Component } from 'react';
import logo from '../static/moisture.png';
import '../App.css';
import { GoogleLogin } from 'react-google-login';
import {choose} from "../utils"
import { Grid, Image } from "semantic-ui-react"
import { Redirect } from "react-router-dom"

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
  "fronds with benefits",
  "sensational plant action",
  "more growth than you might expect",
];

// let background_image_options = [
//   "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134100.jpg",
//   "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134103.jpg",
//   "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134105.jpg",
//   "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134254.jpg",
//   "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134255.jpg",
//   "https://s3-us-west-1.amazonaws.com/moistlywet-assets/backgrounds/IMG_20190322_134300.jpg",
// ];
//

class LandingPage extends Component {

  render() {
    if(this.props.user !== null){
      return <Redirect to="/plants"/>
    }
    let style= {
      position: "absolute",
      paddingTop: "90px",
      top:0,
      height: "100vh",
      width: "100%",
      marginTop: 0,
      backgroundSize: "cover",
      // backgroundImage:`url("${choose(background_image_options)}")`,
    };
    return <>
      <Grid columns={3} style={style} centered >
        <Grid.Column textAlign='center'>
          <Image src={logo} size="small" style={{display:"inline"}}/>
          <h2>Moistly Wet</h2>
          <div>{choose(tagline_options)}</div>
          <br/>
          <GoogleLogin
            clientId="84319228244-9k7qmqmsu2cvsv58lndtsmcl2nl8ovvj.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.props.loginSuccess}
            onFailure={this.props.loginFailure}
            responseType={"token"}
            offline={true}
            isSignedIn={true}
            // autoLoad={true}
          />
        </Grid.Column>
      </Grid>
    </>;
  }
}

export default LandingPage;