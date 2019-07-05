import React, { Component } from 'react';
import './App.css';
import LandingPage from "./components/landingPage.js";
import PlantsListPage from "./components/plantsListPage";
import PlantDetailsPage from "./components/plantDetailsPage";
import PlantEditPage from "./plantEditPage";
import {auth} from "./api"
import Header from './components/header'
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
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
      }
    });
  }

  loginFailure(response){
    console.log("login failure");
    console.log(response);
  }

  logoutSuccess() {
    let state = this.state;
    state.user = null;
    this.setState(state);
  }

  render(){
    console.log(this.state);

    let header = <Header
      loginSuccess={this.loginSuccess.bind(this)}
      loginFailure={this.loginFailure.bind(this)}
      logoutSuccess={this.logoutSuccess.bind(this)}
      user={this.state.user}
    />;

    // anonymous users to landing page
    if(this.state.user === null) {
      console.log("unauthed")
      return <BrowserRouter>
        {header}
        <LandingPage
            user={this.state.user}
            loginSuccess={this.loginSuccess.bind(this)}
            loginFailure={this.loginFailure.bind(this)}
        />
      </BrowserRouter>
    }

    return <BrowserRouter>
      {header}
      <Route exact path="/" render={(props) => <LandingPage user={this.state.user}/>} />
      <Route exact path="/plants" render={(props) => <PlantsListPage plants={this.state.plants} />} />
      <Route exact path="/plant/:id" render={({ match }) => {
        if(this.state.authed){
         return <PlantDetailsPage pubId={match.params.id} />
        }
        return <PlantsListPage plants={this.state.plants} />
      }} />
    </BrowserRouter>;
  }

  // _render() {
  //   console.log(this.state.view);
  //
  //   if(this.state.user === null){
  //     return <LandingPage loginSuccess={this.loginSuccess.bind(this)} loginFailure={this.loginFailure.bind(this)} />
  //   }
  //
  //   if(this.state.view === "listPlants"){
  //     return <PlantsListPage plants={this.state.plants} onClick={this.handleClickEvent.bind(this)}/>
  //   }
  //
  //   if(this.state.view === "details"){
  //     let data = {
  //       moisture:this.state.moistureData,
  //       temperature: this.state.temperatureData,
  //     };
  //     return <PlantDetailsPage plant={this.currentPlant()} apiKeys={this.state.apiKeys} data={data} onClick={this.handleClickEvent.bind(this)}/>
  //   }
  //
  //   if(this.state.view === "edit") {
  //     return <PlantEditPage plant={this.currentPlant()} />
  //   }
  //
  //   return <PlantsListPage plants={this.state.plants} onClick={this.handleClickEvent.bind(this)}/>
  // }
}

export default App;
