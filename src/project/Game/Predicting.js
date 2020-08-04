import React, { useState } from 'react'
import styled from 'styled-components'

function Predicting({ start, turn, playerID, players, nCards, predicted, makePrediction }) {
  const [prediction, setPrediction] = useState(null)

  const n = players.length
  const lastPlayer = Math.abs((start + n - 1) % n)

  let options = [...Array(nCards + 1).keys()]

  const predictionTotal = predicted.reduce((a, b) => a + b, 0) + 1
  const difference = (nCards - predictionTotal)

  const render = playerID === turn ? (
    <HandBoard>
      <div>
        <Heading> Make your prediction </Heading>
        <Options>
          { options.map(option => <Option key={option} selected={prediction === option} disabled={(lastPlayer === playerID) && (option === difference)} value={option} onClick={() => setPrediction(option)}>{ option }</Option>) }
        </Options>
        <Submit disabled={prediction === null} onClick={() => makePrediction(parseInt(prediction))}> Submit Prediction </Submit>
      </div>
    </HandBoard>
  ) : <h1> { players[turn].name } is predicting </h1>

  return (
    <Center>
      { render }
    </Center>
  )
}

const Heading = styled.h1`
  margin-bottom: 0.6rem;
  font-size: 1.5rem;

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

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Option = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  margin: 5px;
  border-radius: 4px;
  // font-weight: 500;
  font-size: 1rem;
  border: none;
  outline: none;
  color: #377DFF;
  background: rgba(55, 125, 255, 0.1);

  &:hover {
    background: rgba(55, 125, 255, 0.3);
  }

  ${props => props.selected && `
    color: white;
    background: #377DFF;

    &:hover {
      background: #377DFF;
    }
  `}

  ${props => props.disabled && `
    color: grey;
    background: #e1e2e3;

    &:hover {
      background: #e1e2e3;
    }
  `}
`

const Submit = styled.button`
  margin: 5px;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: #43AF7B;
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 10px 0;

  ${props => props.disabled && `
    opacity: 0.5;
  `}
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 35px;
`

const HandBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 250px;
  grid-gap: 20px;
  padding: 20px;
  background: #f3f4f5;
  border: 1px solid lightgrey;
  border-radius: 5px;
`

export default Predicting
