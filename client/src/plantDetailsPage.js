import React, { Component } from 'react';
import './App.css';
import {Line} from 'react-chartjs-2';

const exampleData = {
  datasets: [
    {
      label: 'Moisture',
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
    let api_keys = [];
    this.props.apiKeys.forEach(api_key => {
      api_keys.push(<div key={api_key.api_key} className="api_key">{api_key.api_key}</div>)
    });

    let labels = [];
    let data = [];
    this.props.data.forEach(datum => {
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
          label: 'Moisture',
          borderColor: 'rgba(75,192,192,1)',
          data: data
        }
      ]
    };
    console.log(graphjs_data)

    return <div className="plant">
      <table style={{"width":"100%"}}>
        <tbody>
          <tr>
            <td>
              <div className="plant">
                <img src={this.props.plant.image_url} style={{maxWidth: "20vw"}}/>
                <div style={{textAlign: "center"}}>{this.props.plant.name}</div>
                <div style={{textAlign: "center"}}>{this.props.plant.pub_id}</div>
                <div style={{textAlign: "center"}}>{api_keys}</div>
              </div>
            </td>
            <td>
              <Line data={graphjs_data} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }
}

export default PlantDetailsPage;