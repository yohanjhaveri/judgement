import React from 'react'
import styled from 'styled-components'

import Card from 'project/Game/Card'

function Player({ turn, round, hand, cards, start, playerID, playCard }) {
  const playerCards = cards && cards[playerID]
  const isRemaining = playerCards && playerCards.length

  const primarySuit = hand[start][1]
  const primarySuitExists = (turn === playerID) && playerCards.some(card => card[1] === primarySuit)
  return (
    <Center>
      {
        playerCards
        ? <Box>
            <PlayerCards>
              {
                isRemaining && playerCards.map(card => {
                  const disabled = primarySuitExists && (card[1] !== primarySuit)
                  return <PlayerCard disabled={disabled} onClick={disabled ? (() => {}) : (() => playCard(card))} name={card} show scale={1} />
                })
              }
            </PlayerCards>
          </Box>
        : <div />
      }
    </Center>
  )
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 35px;
`

const Title = styled.h2`
  display: flex;
  grid-gap: 10px;
  font-size: 1.8rem;
  align-items: center;
  margin-bottom: 20px;
`

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(191, 59, 83, 0.1);
  border: 1px solid #BF3B53;
  border-radius: 5px;
`

const PlayerCards = styled.div`
  display: flex;
  grid-gap: 10px;
`

const PlayerCard = styled(Card)`
  cursor: pointer;
  position: relative;

  opacity: ${props => props.disabled && '0.5'};
  cursor: ${props => props.disabled && 'default'};

  &:active {
    cursor: grabbing;
  }
`

export default Player
