import React, { Component } from 'react';
import './App.css';
import LandingPage from "./landingPage.js";
import PlantsListPage from "./plantsListPage";
import PlantDetailsPage from "./plantDetailsPage";
import PlantEditPage from "./plantEditPage";
import {auth, list_plants, list_api_keys, list_plant_moisture, list_plant_temperature} from "./api"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      view: null,
      plantPubId: null,
    };
  }

  loginSuccess(response){
    auth(response).then(resp => {
      if(resp){
        list_plants().then(plants_data => {
          list_api_keys().then(api_keys_data => {
            let state = this.state;
            state.user = response.profileObj;
            state.plants = plants_data.plants;
            state.apiKeys = api_keys_data.api_keys;
            state.view = "listPlants";
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

  handleClickEvent(data){
    console.log(data.action, data.pubId);
    let state = this.state;

    if(data.action === "listPlants") {
        state.view = "listPlants";
        this.setState(state);
    }

    if(data.action === "details") {
      list_plant_moisture(data.pubId, 24).then(plant_moisture_data => {
        list_plant_temperature(data.pubId).then(plant_temperature_data => {
          state.view = "details";
          state.plantPubId = data.pubId;
          state.moistureData = plant_moisture_data.data;
          state.temperatureData = plant_temperature_data.data;
          console.log(plant_moisture_data);
          console.log(plant_temperature_data);
          this.setState(state);
        });
      });
    }

    if(data.action === "edit") {
      state.view = "edit";
      state.plantPubId = data.pubId;
      this.setState(state);
    }

  }

  currentPlant(){
    let the_plant = null;
    this.state.plants.forEach(plant => {
      if(plant.pub_id === this.state.plantPubId){
        the_plant = plant;
      }
    });
    return the_plant;
  }

  render() {
    console.log(this.state.view);

    if(this.state.user === null){
      return <LandingPage loginSuccess={this.loginSuccess.bind(this)} loginFailure={this.loginFailure.bind(this)} />
    }

    if(this.state.view === "listPlants"){
      return <PlantsListPage plants={this.state.plants} onClick={this.handleClickEvent.bind(this)}/>
    }

    if(this.state.view === "details"){
      let data = {
        moisture:this.state.moistureData,
        temperature: this.state.temperatureData,
      };
      return <PlantDetailsPage plant={this.currentPlant()} apiKeys={this.state.apiKeys} data={data} onClick={this.handleClickEvent.bind(this)}/>
    }

    if(this.state.view === "edit") {
      return <PlantEditPage plant={this.currentPlant()} />
    }

    return <PlantsListPage plants={this.state.plants} onClick={this.handleClickEvent.bind(this)}/>
  }
}

export default App;
