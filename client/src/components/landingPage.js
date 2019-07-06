import React, { Component } from 'react';
import logo from '../static/moisture.png';
import '../App.css';
import { GoogleLogin } from 'react-google-login';
import {choose} from "../utils"
import { Grid, Image } from "semantic-ui-react"
import {PlantMoistureGraph} from "./plantDetailsPage"
import {get_plant} from "../api";

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

    examplePubId = "plant_09ee89d38ff74034a0c828d05ec74217";

    constructor(props) {
    super(props);
    this.state = {
      plant: {name:"", image_url:"", pubId: this.examplePubId}
    };

    get_plant(this.examplePubId).then(plant_details => {
      let state = this.state;
      state.pubId = this.examplePubId;
      state.plant = plant_details;
      this.setState(state);
    });
  }


  render() {
    // if(this.props.user !== null){
    //   return <Redirect to="/plants"/>
    // }
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
          <PlantMoistureGraph pubId={this.examplePubId} plant={this.state.plant} />
          <div>{choose(tagline_options)}</div>
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