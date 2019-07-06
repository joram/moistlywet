import React, { Component } from 'react';
import '../App.css';
import {Line} from 'react-chartjs-2';
import "chartjs-plugin-annotation";
import {get_plant, list_plant_moisture} from "../api"
import {Grid, Image, Header} from "semantic-ui-react"


class PlantMoistureGraph extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      data: [],
      options: {},
    };

    if(this.props.pubId !== undefined){
      list_plant_moisture(this.props.pubId, 24).then(response => {
        console.log("state", this.state);
        let state = this.state;
        let graph_data = this._create_graphjs_data.bind(this)(response.data, "moisture");
        state.loaded = true;
        state.data = graph_data.data;
        state.options = graph_data.options;
        this.setState(state);
      });
    }

  }

  _create_graphjs_data(raw_data, metric_name){
    let labels = [];
    let data = [];
    raw_data.forEach(datum => {
      if(datum.value===0){return}
      if(datum.value===1024){return}
      let t = new Date(datum.created*1000);
      labels.push(t);
      data.push({
        t: t,
        y: datum.value,
      });
    });

    let graphjs_data = {
      labels: labels,
      datasets: [
        {
          label: metric_name,
          borderColor: 'rgba(75,192,192,1)',
          data: data
        }
      ],

    };

    console.log("plant", this.props.plant);

    let graphjs_options = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              quarter: 'MMM YYYY'
            }
          }
        }]
      },
      annotation: {
        annotations: [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: this.props.plant.min_moisture,
          borderColor: 'rgb(192, 75, 75)',
          borderWidth: 2,
          label: {
            enabled: false,
            content: 'Min Moisture'
          }
        },{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: this.props.plant.max_moisture,
          borderColor: 'rgb(75, 75, 192)',
          borderWidth: 2,
          label: {
            enabled: false,
            content: 'Max Moisture'
          }
        }]
      }
    };
    return {
      data: graphjs_data,
      options: graphjs_options,
    }
  }

  render(){
    if(this.state.loaded === false){
      return null;
    }
    console.log(this.state.options);
    return <Line
        data={this.state.data}
        options={this.state.options}
    />
  }
}


class PlantDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiKeys: [],
      plant: {name:"", image_url:""}
    };

    get_plant(this.props.pubId).then(plant_details => {
      let state = this.state;
      state.pub_id = this.props.pubId;
      state.plant = plant_details;
      this.setState(state);
    });
  }

  onHistoryChange(e){
      let state = this.state;
      state.history = parseInt(e.target.value);
      list_plant_moisture(this.props.plant.pub_id, 24).then(plant_moisture_data => {
        state.moistureData = plant_moisture_data.data;
        this.setState(state);
      });
  }

  render() {

    let api_keys = [];
    this.state.apiKeys.forEach(api_key => {
      api_keys.push(<div key={api_key.api_key} className="api_key">{api_key.api_key}</div>)
    });
    console.log("details page: ", this.state);
    return <Grid textAlign="center">
          <Grid.Column width={4}>
              <br/>
              <Header>{this.state.plant.name}</Header>
              <Image src={this.state.plant.image_url} size="medium"/>
              <div>{this.state.plant.pub_id}</div>
              <div>{api_keys}</div>
          </Grid.Column>
          <Grid.Column width={12}>
              <PlantMoistureGraph pubId={this.props.pubId} plant={this.state.plant} />
              <select onChange={this.onHistoryChange.bind(this)}>
                <option value="1">1hr</option>
                <option value="12">12hrs</option>
                <option value="24">day</option>
                <option value="72">3 days</option>
                <option value="168">week</option>
              </select>
          </Grid.Column>
      </Grid>;
  }
}


export default PlantDetailsPage;