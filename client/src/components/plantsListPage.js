import React, { Component } from 'react';
import '../App.css';
import {Grid, Card, Image, Segment} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {list_plants} from "../api"
import add_icon from "../static/add.png"

class PlantItem extends Component {

  onClick(){
    this.props.onClick({
      pubId: this.props.pubId,
      action: "details",
    })
  }

  render() {
    return <Link to={"/plant/"+this.props.pubId}>
      <Card>
        <Image src={this.props.imageUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta style={{
            overflow: "hidden" ,
            textOverflow: "ellipsis"
          }}>
            {this.props.minMoisture} - {this.props.maxMoisture}
          </Card.Meta>
        </Card.Content>
      </Card>
    </Link>
  }
}

class PlantsListPage extends Component {

  constructor(props){

    super(props);
    this.state = {
      plants: [],
    };
    list_plants().then((response) => {
      let state = this.state;
      state.plants = response.plants;
      this.setState(state);
    })
  }

  render() {

    let plants = [];
    this.state.plants.forEach(plant =>{
      let p = <Grid.Column key={plant.pub_id}><PlantItem
        name={plant.name}
        minMoisture={plant.min_moisture}
        maxMoisture={plant.max_moisture}
        imageUrl={plant.image_url}
        pubId={plant.pub_id}
        key={plant.pub_id}
        onClick={this.props.onClick}
      /></Grid.Column>;
      plants.push(p);
    });

    return <Segment basic>
      <Grid columns={6}>
        {plants}
        <Grid.Column key="add">
        <Link to="/create/plant">
          <Card>
            <Image src={add_icon} wrapped ui={false} size="small"/>
            <Card.Content>
              <Card.Header>New Plant</Card.Header>
            {/*  <Card.Meta>*/}
            {/*    {this.props.minMoisture} - {this.props.maxMoisture}*/}
            {/*  </Card.Meta>*/}
            </Card.Content>
          </Card>
        </Link>
        </Grid.Column>
      </Grid>
    </Segment>
  }
}

export default PlantsListPage;