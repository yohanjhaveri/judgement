import React from 'react'
import styled from 'styled-components'

import fire from 'fire'
import Player from './Player'

import { generateGameStructure } from 'helpers'

function Room({ code, name, game }) {
  const players = game.players
  const host = players[0].name
  const isHost = host === name

  const playerName = name
  const playerInfo = players.find(player => player.name === playerName)

  const ALL_READY = players.every(player => player.ready)
  const message = (players.length > 1) ? (ALL_READY ? 'Waiting for the host to start...' : 'Waiting for players...') : 'Waiting for more players...'

  const ready = () => {
    const updated = players.map(player => {
      if(player.name === playerName) {
        player.ready = true
      }
      return player
    })
    fire.database().ref('game').child(code).update({ players: updated })
  }

  const start = () => {
    fire.database().ref('game').child(code).update(generateGameStructure(players))
  }

  const removePlayer = name => {
    const updated = players.filter(player => {
      if(player.name === name) {
        return false
      }
      return true
    })
    fire.database().ref('game').child(code).update({ players: updated })
  }

  return (
    <Screen>
      <Box>
        <Heading>{ message }</Heading>
        <Players>
          {players.map(player => <Player name={player.name} ready={player.ready} host={player.name === host} isHost={isHost} removePlayer={removePlayer} />)}
        </Players>
        <Buttons>
        {
          isHost
          ? <Button onClick={start} disabled={!ALL_READY || (players.length < 2)} color="blue">START</Button>
          : <Button onClick={ready} disabled={playerInfo && playerInfo.ready}>READY</Button>
        }
        </Buttons>
      </Box>
    </Screen>
  )
}

const Screen = styled.main`
  font-family: Avenir, sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: #f8f9fa;
`

const Box = styled.div`
  background: #f8f9fa;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 20px;
  min-width: 350px;
`

const Heading = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: ${
    props => {
      switch(props.color) {
        case 'blue': return '#377DFF'
        case 'green': return '#43AF7B'
        case 'red': return '#BF3B53'
        default: return 'black'
      }
    }
  };
`

const Players = styled.ol`
  padding-left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
  margin-top: 20px;
`

const Button = styled.button`
  color: white;
  background: ${props => props.color === "blue" ? '#377dff' : '#17b978'};
  border: none;
  border-radius: 5px;
  height: 46px;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.8px;

  opacity: ${props => props.disabled && 0.5};
`

export default Room
