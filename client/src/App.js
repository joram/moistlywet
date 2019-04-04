import React, { Component } from 'react';
import './App.css';
import LandingPage from "./landingPage.js";
import PlantsListPage from "./plantsListPage";
import PlantDetailsPage from "./plantDetailsPage";
import {auth, list_plants, list_api_keys, list_plant_moisture} from "./api"

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
        list_plants().then(plants_data => {
          list_api_keys().then(api_keys_data => {
            console.log(api_keys_data.api_keys);
            let state = this.state;
            state.user = response.profileObj;
            state.plants = plants_data.plants;
            state.apiKeys = api_keys_data.api_keys;
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
    list_plant_moisture(data.pubId).then(plant_moisture_data => {
      state.plantPubId = data.pubId;
      state.moistureData = plant_moisture_data.data;
      console.log(plant_moisture_data);
      this.setState(state);
    });
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
        plant={the_plant} apiKeys={this.state.apiKeys} data={this.state.moistureData} />
    }

    return <PlantsListPage plants={this.state.plants} plantSelected={this.plantSelected.bind(this)}/>
  }
}

export default App;
