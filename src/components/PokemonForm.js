import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      front: '',
      back: ''
    }
  }

  updateForm = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }

    postPokemon = (url, data) => {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json())
  }


  handleSubmit = async (event)  => {
    event.preventDefault()
    const { name, hp, front, back } = this.state
    const { setPoke } = this.props
    const poke = {
       name, //name: name
       stats: [
        {
          name:'hp',
          value: hp
        }
       ],   
       sprites: {
          front,
          back
      }
    }
    const newPoke = await this.postPokemon('http://localhost:3000/pokemon', poke)
    setPoke(newPoke)
  }

  render() {
    const { updateForm } = this

    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input onChange={updateForm} fluid label="Name" placeholder="Name" name="name" />
            <Form.Input onChange={updateForm} fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input onChange={updateForm} fluid label="Front Image URL" placeholder="url" name="front" />
            <Form.Input onChange={updateForm} fluid label="Back Image URL" placeholder="url" name="back" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
