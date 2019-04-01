import React, { Component } from 'react';
import './App.css';
import LandingPage from "./landingPage.js";
import PlantsListPage from "./plantsListPage";
import PlantDetailsPage from "./plantDetailsPage";
import {auth, list_plants, list_api_keys} from "./api"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      plantPubId: null,
    };
  }

  loginSuccess(response){
    auth(response).then(resp => {
      if(resp){
          let state = this.state;
        list_plants().then(data => {
          state.user = response.profileObj;
          console.log(data.plants);
          state.plants = data.plants;
          list_api_keys().then(data => {
            console.log(data.api_keys);
            state.apiKeys = data.api_keys;
            this.setState(state);
          })

        });
      }
    });
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
      let the_plant = null;
      this.state.plants.forEach(plant => {
        if(plant.pub_id === this.state.plantPubId){
          the_plant = plant;
        }
      });
      return <PlantDetailsPage
        plant={the_plant} apiKeys={this.state.apiKeys} />
    }

    return <PlantsListPage plants={this.state.plants} plantSelected={this.plantSelected.bind(this)}/>
  }
}

export default App;
