import React, { Component } from 'react';
import '../App.css';
import {Line} from 'react-chartjs-2';
import "chartjs-plugin-annotation";
import {get_plant, list_api_keys, list_plant_moisture} from "../api"
import {Grid, Image, Header} from "semantic-ui-react"


class PlantDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiKeys: [],
      plant: {name:"", image_url:""}
    };

    let pubId = this.props.pubId;
    let state = this.state;
    list_plant_moisture(pubId, 24).then(moisture_data => {
      get_plant(pubId).then(plant_details => {
        state.pub_id = pubId;
        state.plant = plant_details;
        state.view = "details";
        state.plantPubId = pubId;
        state.moistureData = moisture_data.data;
        this.setState(state);
      });
    });
  }

  onHistoryChange(e){
      let state = this.state;
      state.history = parseInt(e.target.value);
      list_plant_moisture(this.props.plant.pub_id, 24).then(plant_moisture_data => {
        console.log(plant_moisture_data);
        state.moistureData = plant_moisture_data.data;
        this.setState(state);
      });
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
          value: this.state.plant.min_moisture,
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
          value: this.state.plant.max_moisture,
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

  render() {

    let api_keys = [];
    this.state.apiKeys.forEach(api_key => {
      api_keys.push(<div key={api_key.api_key} className="api_key">{api_key.api_key}</div>)
    });

    let moisture_config = {};
    if(this.state.moistureData !== undefined){
      moisture_config = this._create_graphjs_data(this.state.moistureData, "moisture");
    }

    let style= {
      border: "solid thin black",
    };


    return <Grid textAlign="center">
          <Grid.Column width={4}>
              <br/>
              <Header>{this.state.plant.name}</Header>
              <Image src={this.state.plant.image_url} size="medium"/>
              <div>{this.state.plant.pub_id}</div>
              <div>{api_keys}</div>
          </Grid.Column>
          <Grid.Column width={12}>
              <Line data={moisture_config.data} options={moisture_config.options} />
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