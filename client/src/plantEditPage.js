import React, {Component} from 'react'
import { Form, Field } from 'react-final-form'
import ImageUploader from 'react-images-upload';
import {edit_plant} from './api'


class PlantEditPage extends Component {

  constructor(props) {
    super(props);
    this.state = {pictures: []}
  }

  onSubmit(data){
    edit_plant(this.props.plant.pub_id, data)
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  render(){
    return <Form
      onSubmit={this.onSubmit.bind(this)}
      initialValues={ this.props.plant }
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <Field name="name" component="input" type="text" placeholder="name"/>
          </div>

          <div>
            <label>Max Moisture</label>
            <Field name="min_moisture" component="input" type="integer" placeholder="0"/>
          </div>

          <div>
            <label>Max Moisture</label>
            <Field name="max_moisture" component="input" type="integer" placeholder="1024"/>
          </div>

          <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop.bind(this)}
                singleImage={true}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />

          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    />

  }
}

export default PlantEditPage;