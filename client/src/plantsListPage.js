import React, { Component } from 'react';
import './App.css';

class PlantItemMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {collapsed: true}
  }

  toggleCollapsed(){
    let state = this.state;
    state.collapsed = !state.collapsed;
    this.setState(state);
  }

  onClick(e){
    e.stopPropagation();
    this.toggleCollapsed();
  }

  onClickEdit(e){
    e.stopPropagation();
    this.toggleCollapsed();
    this.props.onClick({
      pubId: this.props.pubId,
      action: "edit",
    })
  }

  onClickDelete(e){
    e.stopPropagation();
    this.toggleCollapsed();
    this.props.onClick({
      pubId: this.props.pubId,
      action: "delete",
    })
  }

  render() {
    let wrapperStyle = {
      position: "absolute",
      top: "5px",
      right: "5px",
    };
    let itemStyle = {
      textAlign: "right",
      paddingRight: "5px",
      border: "solid thin black",
      width: "70px",
      backgroundColor: "white",
    };
    let icon = <div style={{float:"right"}} onClick={this.onClick.bind(this)}>=</div>;
    if(this.state.collapsed){
      return <div style={wrapperStyle}>{icon}</div>;
    }

    return <div style={wrapperStyle}>
      {icon}
      <ul style={{listStyle: "none"}}>
        <li style={itemStyle} onClick={this.onClickEdit.bind(this)}>edit</li>
        <li style={itemStyle} onClick={this.onClickDelete.bind(this)}>delete</li>
      </ul>
    </div>;

  }
}

class PlantItem extends Component {

  onClick(){
    this.props.onClick({
      pubId: this.props.pubId,
      action: "details",
    })
  }

  render() {
    let style = {
      maWidth: "20vw",
      margin: "10px",
      border: "3px solid #000",
      boxShadow: "3px 3px 8px 0px rgba(0,0,0,0.3)",
      position: "relative",
    }
    return <div className="plant" style={style} onClick={this.onClick.bind(this)}>
      <img src={this.props.imageUrl} style={{maxWidth: "20vw"}} alt={this.props.name}/>
      <div style={{textAlign: "center"}}>{this.props.name}</div>
      <PlantItemMenu pubId={this.props.pubId} onClick={this.props.onClick} />
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