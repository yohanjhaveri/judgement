import React from 'react'
import styled from 'styled-components'

import Card from 'project/Game/Card'

function Playing({ winner, hand, start, turn, players }) {

  const n = players.length
  const render = []

  for(let i = 0; i < n; i++) {
    const index = ((i + start) % n)
    const card = hand[index]
    render.push(
      <HandCards>
        <Player winner={winner === index}>{ players[index].name } { (winner === index) &&  <Crown className="fa fa-crown" /> }</Player>
        <HandCard turn={winner === -1 && (turn === index)} name={card} show scale={1.3} />
      </HandCards>
    )
  }

  return (
    <Center>
      <HandBoard>
        { render }
      </HandBoard>
    </Center>
  )
}

const Crown = styled.i`
  color: gold;
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

const HandCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HandCard = styled(Card)`
  ${props => props.turn && `
    border: 1px solid #BF3B53;
    background: rgba(191, 59, 83, 0.1);
  `};
`


const Player = styled.h2`
  margin-bottom: 12px;
  font-size: 1.25rem;
  ${props => props.turn && `
    color: #BF3B53;
  `}

  ${props => props.winner && `
    color: gold;
  `}
`

export default Playing
