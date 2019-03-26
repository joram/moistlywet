import React, { Component } from 'react';
import './App.css';
import LandingPage from "./landingPage.js";
import PlantsListPage from "./plantsListPage";
import PlantDetailsPage from "./plantDetailsPage";
import {choose} from "./utils"

let plant_image_urls = [
  "https://cdn.bmstores.co.uk/images/hpcProductImage/imgFull/297350-Leafy-Plant-Pot.jpg",
  "https://target.scene7.com/is/image/Target/GUEST_fc982b27-ef4f-48a3-bf11-a69d32cc91cc?wid=488&hei=488&fmt=pjpeg",
  "https://images-na.ssl-images-amazon.com/images/I/41NbuQ-wKPL._SX425_.jpg",
  "https://cdn.shopclues.com/images1/thumbnails/92328/320/320/140786749-92328394-1539116494.jpg",
];

let test_plants = [
  {
    name: "Plant #1",
    minMoisture: 10.0,
    maxMoisture: 50.0,
    imageUrl: choose(plant_image_urls),
    pubId: 1,
  },
  {
    name: "Plant #2",
    minMoisture: 10.0,
    maxMoisture: 500.0,
    imageUrl: choose(plant_image_urls),
    pubId: 2,
  },
  {
    name: "Bob the Plant",
    minMoisture: 1.0,
    maxMoisture: 50.0,
    imageUrl: choose(plant_image_urls),
    pubId: 3,
  },
  {
    name: "Planticus",
    minMoisture: 1.0,
    maxMoisture: 50.0,
    imageUrl: choose(plant_image_urls),
    pubId: 4,
  },
  {
    name: "Planticlese",
    minMoisture: 1.0,
    maxMoisture: 50.0,
    imageUrl: choose(plant_image_urls),
    pubId: 5,
  },
  {
    name: "Plant number one",
    minMoisture: 10.0,
    maxMoisture: 50.0,
    imageUrl: choose(plant_image_urls),
    pubId: 6,
  },
  {
    name: "Plant #2/58",
    minMoisture: 10.0,
    maxMoisture: 500.0,
    imageUrl: choose(plant_image_urls),
    pubId: 7,
  },
  {
    name: "Bob the Plant the II",
    minMoisture: 1.0,
    maxMoisture: 50.0,
    imageUrl: choose(plant_image_urls),
    pubId: 8,
  },
  {
    name: "Planticus the 2nd",
    minMoisture: 1.0,
    maxMoisture: 50.0,
    imageUrl: choose(plant_image_urls),
    pubId: 9,
  },
  {
    name: "Planticlese the second",
    minMoisture: 1.0,
    maxMoisture: 50.0,
    imageUrl: choose(plant_image_urls),
    pubId: 10,
  },

];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      plantPubId: null,
    };
  }

  loginSuccess(response){
    let state = this.state;
    state.user = response.profileObj;
    this.setState(state);
  }

  loginFailure(response){
    console.log("login failure");
    console.log(response);
  }

  plantSelected(data){
    let state = this.state;
    state.plantPubId = data.pubId;
    this.setState(state);
  }

  render() {
    if(this.state.user === null){
      return <LandingPage loginSuccess={this.loginSuccess.bind(this)} loginFailure={this.loginFailure.bind(this)} />
    }
    if(this.state.plantPubId){
      return <PlantDetailsPage name="Bob" imageUrl="https://cdn.shopclues.com/images1/thumbnails/92328/320/320/140786749-92328394-1539116494.jpg" />
    }

    return <PlantsListPage plants={test_plants} plantSelected={this.plantSelected.bind(this)}/>
  }
}

export default App;
