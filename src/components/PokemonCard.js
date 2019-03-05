import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  
state = {
  flip: false
}

flipCard = () => {
 this.setState({flip: !this.state.flip})
}

  render() {
    const { poke } = this.props
    const { flipCard } = this
    const {flip } = this.state

    const stat = poke.stats.find(stat => stat.name === "hp")
    return (
      <Card onClick={flipCard}>
        <div>
          <div className="image">
            { !flip
              ? <img src={poke.sprites.front} />
              : <img src={poke.sprites.back} />
          }
          </div>
          <div className="content">
            <div className="header">{poke.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
            {stat.value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
