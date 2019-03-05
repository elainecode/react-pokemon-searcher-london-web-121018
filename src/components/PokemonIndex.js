import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    input: ''
  }

  setPoke = (poke) => {
    const { pokemon } = this.state
    this.setState({ pokemon: [poke, ...pokemon]})
  }

  updateInput = (value) => {
    const input = value
    this.setState({input})
  }

  filter = () => {
    const { pokemon, input } = this.state
    return input === ''
    ? pokemon
    : pokemon.filter(poke => poke.name.toLowerCase().includes(input.toLowerCase()))
  }

  getPokemon = async () => {
   const pokemon = await fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
        this.setState({pokemon})
  }

  componentDidMount () {
    this.getPokemon()
  }

  render() {
   const { pokemon } = this.state
   const { updateInput, filter, setPoke } = this


    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={
        // _.debounce(() => console.log('🤔'), 500)
        event => updateInput(event.target.value)
        }  
        showNoResults={false} />
         <PokemonForm 
          setPoke={setPoke}
         />
        <br />
        <PokemonCollection 
          pokemon={this.filter()}
        />
        <br />
      </div>
    )
  }
}

export default PokemonPage
