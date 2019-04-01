import React, { Component } from 'react';
import './App.css';
import {Line} from 'react-chartjs-2';

const exampleData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class PlantDetailsPage extends Component {
  render() {
    console.log(this.props.plant);
    console.log(this.props.apiKeys);
    let api_keys = [];
    this.props.apiKeys.forEach(api_key => {
      api_keys.push(<div key={api_key.api_key} className="api_key">{api_key.api_key}</div>)
    });

    return <div className="plant">
      <div className="plant">
        <img src={this.props.plant.image_url} style={{maxWidth: "20vw"}}/>
        <div style={{textAlign: "center"}}>{this.props.plant.name}</div>
        <div style={{textAlign: "center"}}>{this.props.plant.pub_id}</div>
      </div>
      {api_keys}
      <Line data={exampleData} />
    </div>;
  }
}

export default PlantDetailsPage;