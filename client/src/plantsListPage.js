import React, { Component } from 'react';
import './App.css';

class PlantItem extends Component {

  onClick(){
    this.props.onClick({
      pubId: this.props.pubId,
    })
  }

  render() {
    let style = {
      maWidth: "20vw",
      margin: "10px",
      border: "3px solid #000",
      boxShadow: "3px 3px 8px 0px rgba(0,0,0,0.3)",
    }
    return <div className="plant" style={style} onClick={this.onClick.bind(this)}>
      <img src={this.props.imageUrl} style={{maxWidth: "20vw"}} alt={this.props.name}/>
      <div style={{textAlign: "center"}}>{this.props.name}</div>
    </div>;
  }
}

class PlantsListPage extends Component {

  render() {
    if(this.props.plants === undefined){
      return null
    }
    let plants = [];
    this.props.plants.forEach(plant =>{
      console.log(plant )
      plants.push(<PlantItem
        name={plant.name}
        minMoisture={plant.min_moisture}
        maxMoisture={plant.max_moisture}
        imageUrl={plant.image_url}
        pubId={plant.pub_id}
        key={plant.pub_id}
        onClick={this.props.plantSelected}
      />)
    });

    let style = {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-start",
      flexDirection: "row",
      maxHeight: "100vh",
    };
    return <div className="App" style={style}>
      {plants}
    </div>;
  }
}

export default PlantsListPage;