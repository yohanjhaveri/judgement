import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import fire from 'fire'
import { generateGame, setPath } from 'helpers'

function Join({ load, create, createGame, joinGame }) {
  const [name, setName] = useState('')

  const handleInput = value => {
    setName(value)
  }

  return (
    <Screen>
      <Name placeholder="Enter name here" onChange={e => handleInput(e.target.value)} />
      {
        create
        ? <Button disabled={load} color="green" onClick={() => createGame(name)}> Create Room {load && <Spinner />} </Button>
        : <Button disabled={load} color="red" onClick={() => joinGame(name)}> Join Room {load && <Spinner />} </Button>
      }
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

const Name = styled.input`
  border: none;
  width: 200px;
  height: 50px;
  // color: grey;
  outline: none;
  font-size: 1.5rem;
  border-radius: 5px;
  font-weight: 800;
  // text-align: center;
  // caret-color: transparent;

  &:focus ::placeholder {
    color: white;
  }

  ::placeholder {
    font-weight: 800;
    font-size: 1.5rem;
    color: lightgrey;
  }
`

const Button = styled.button`
  background: ${
    props => {
      switch(props.color) {
        case 'blue': return '#377DFF'
        case 'green': return '#43AF7B'
        case 'red': return '#BF3B53'
        default: return 'black'
      }
    }
  };

  font-size: 1rem;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  outline: none;
  width: 200px;
  height: 40px;

  ${props => props.disabled && `
    opacity: 0.5;
  `}
`

const Spinner = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
  border: 0.2em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  margin-left: 8px;
  -webkit-animation: spinner .75s linear infinite;
  animation: spinner .75s linear infinite;

  @keyframes spinner {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`

export default Join
