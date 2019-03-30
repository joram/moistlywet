import React, { Component } from 'react';
import './App.css';
import LandingPage from "./landingPage.js";
import PlantsListPage from "./plantsListPage";
import PlantDetailsPage from "./plantDetailsPage";
import {auth, list_plants} from "./api"

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
    auth(response).then(resp => {
      if(resp){
        state.user = response.profileObj;
        list_plants().then(data => {
          console.log(data.plants);
          state.plants = data.plants;
          this.setState(state);
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
      return <PlantDetailsPage name="Bob" imageUrl="https://cdn.shopclues.com/images1/thumbnails/92328/320/320/140786749-92328394-1539116494.jpg" />
    }

    return <PlantsListPage plants={this.state.plants} plantSelected={this.plantSelected.bind(this)}/>
  }
}

export default App;
