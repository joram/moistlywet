import React, { Component } from 'react';
import './App.css';
import {Line} from 'react-chartjs-2';

class PlantDetailsPage extends Component {

  onClickBack(e){
    this.props.onClick({
      action: "listPlants",
    })
  }

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
        }
    };

    let style= {
      border: "solid thin black",
    };

    return <div className="plant">
      <div onClick={this.onClickBack.bind(this)}>back</div>
      <table style={{"width":"100%"}}>
        <tbody>
          <tr>
            <td style={style}>
              <div className="plant">
                <div style={{textAlign: "center"}}>{this.props.plant.name}</div>
                <img src={this.props.plant.image_url} style={{
                  maxWidth: "25vw",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}/>
                <div style={{textAlign: "center"}}>{this.props.plant.pub_id}</div>
                <div style={{textAlign: "center"}}>{api_keys}</div>
              </div>
            </td>
            <td style={style}>
              <Line data={graphjs_data} options={graphjs_options} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>;
  }
}

export default PlantDetailsPage;