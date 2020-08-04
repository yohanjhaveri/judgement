import React from 'react'
import styled from 'styled-components'

function Predictions({ made, predicted, players }) {
  return (
    <Center>
      <Box>
        {
          players.map((player, index) => {
            const prediction = predicted[index] !== -1 ? predicted[index] : '';
            const current = made[index];
            return (
              <Player>
                <Name>{ player.name }</Name>
                <Prediction success={current === prediction}>
                  { prediction === '' ? '?' : `${current} / ${prediction}`}
                </Prediction>
              </Player>
            )
          })
        }
      </Box>
    </Center>
  )
}

const Center = styled.div`

`

const Box = styled.div`
  display: flex;
  grid-gap: 20px;
`

const Player = styled.div`
  text-align: center;
  background: #f2f3f4;
  min-width: 100px;
  border-radius: 5px;
  padding: 8px;
  border: 1px solid #e1e2e3;
`

const Name = styled.h4`
  font-weight: 500;
  color: black;
  margin-bottom: 5px;
`

const Prediction = styled.div`
  font-weight: 800;
  border-radius: 4px;
  padding: 3px;
  color: #BF3B53;
  background: rgba(191, 59, 83, 0.1);
  ${props => props.success && `
    color: #43AF7B;
    background: rgba(67, 175, 123, 0.15)
  `}
`

export default Predictions
