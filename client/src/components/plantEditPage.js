import React, { Component } from 'react';
import '../App.css';
import "chartjs-plugin-annotation";
import {Grid, Button, Form, Label, Input, Icon, Image, Segment} from "semantic-ui-react"


class UploadImage extends Component {
  id = Math.random().toString(36).substring(7);

  constructor(props){
    super(props);
    this.state={
      image_url: null,
    }
  }

  render() {
    return ( <>
      <Image src={this.state.image_url} size="medium"/>
      <Label width="4" as="label" htmlFor={this.id} size="big">
        <Icon name="file" /> Upload Picture
      </Label>
      <input name="image" id={this.id} hidden type="file" onChange={this.onChangeFile.bind(this)}/>
    </>);
  }

  onChangeFile(event){
    let image_url = URL.createObjectURL(event.target.files[0]);
    this.setState({image_url: image_url});
  }
}


class PlantEditPage extends Component {
  render(){
    return <Grid centered style={{marginTop: "50px"}}>
      <Form action="/create/plant" >
        <Segment compact textAlign="center">
          <Form.Field>
            <Input label={{ basic: true, content: 'Plant Name' }} name="name"/>
          </Form.Field>

          <Form.Field>
            <UploadImage />
          </Form.Field>

          <Form.Field>
            <Input label={{ basic: true, content: 'Min Moisture' }}  name="min_moisture" type="number" value={0}/>
          </Form.Field>

          <Form.Field>
            <Input label={{ basic: true, content: 'Max Moisture' }}  name="max_moisture" type="number" value={100}/>
          </Form.Field>

          <Button type="submit">Save</Button>
        </Segment>
      </Form>
    </Grid>
  }
}


export default PlantEditPage;
