import React, { Component } from 'react';
import './App.css';
import {Grid, Card, Image, Segment} from "semantic-ui-react";
import { Link } from "react-router-dom";

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
          <Card.Meta>
            {this.props.minMoisture} - {this.props.maxMoisture}
          </Card.Meta>
        </Card.Content>
      </Card>
    </Link>
  }
}

class PlantsListPage extends Component {

  render() {
    // if(this.props.plants === undefined){
    //   return null
    // }
    let plants = [];
    this.props.plants.forEach(plant =>{
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
      </Grid>
    </Segment>
  }
}

export default PlantsListPage;