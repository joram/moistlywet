import React, { Component } from 'react';
import './App.css';
import LandingPage from "./landingPage.js";
import PlantsListPage from "./plantsListPage";
import PlantDetailsPage from "./plantDetailsPage";
import PlantEditPage from "./plantEditPage";
import {auth, list_plants, list_api_keys, list_plant_moisture, list_plant_temperature} from "./api"
import Header from './components/header'
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      view: null,
      plantPubId: null,
      plants: [],
      apiKeys: [],
      authed: false,
    };
  }

  loginSuccess(response){
    auth(response).then(resp => {
      if(resp){
        let state = this.state;
        state.user = response.profileObj;
        state.authed = true;
        this.setState(state);
        this.getPlants();
      }
    });
  }

  getPlants(){
    return list_plants().then(plants_data => {
      list_api_keys().then(api_keys_data => {
        let state = this.state;
        state.plants = plants_data.plants;
        state.apiKeys = api_keys_data.api_keys;
        state.view = "listPlants";
        this.setState(state);
      })
    });
  }

  loginFailure(response){
    console.log("login failure");
    console.log(response);
  }

  getPlant(pubId){
    if(this.state.plants.length === 0){
      this.getPlants();
      return {}
    }

    let the_plant = null;
    console.log(this.state.plants);
    this.state.plants.forEach(plant => {
      if(plant.pub_id === pubId){
        the_plant = plant;
      }
    });
    if(the_plant === null){
      // this.getPlants();
      // return this.getPlant(pubId);
    }
    return the_plant;
  }

  render(){

    // let plantsPage = <PlantsListPage plants={this.state.plants} onClick={this.handleClickEvent.bind(this)}/>
    //
    return (<BrowserRouter>
      <Header
        loginSuccess={this.loginSuccess.bind(this)}
        loginFailure={this.loginFailure.bind(this)}
        user={this.state.user}
      />
      {/*<Route exact path="/plants" component={PlantsListPage} plants={this.state.plants} />*/}
      <Route exact path="/" render={(props) => <> Home Page </>} />
      <Route exact path="/plants" render={(props) => <PlantsListPage plants={this.state.plants} />} />
      {/*<Route path="/plants" component={PlantsListPage}  />*/}
      <Route exact path="/plant/:id" render={({ match }) => {
        if(this.state.authed){
         return <PlantDetailsPage pubId={match.params.id} />
        }
        return <PlantsListPage plants={this.state.plants} />
      }} />
    </BrowserRouter>)
  }

  _render() {
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
