import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Card from './Card'

function CardDeck({ cards, onClick }) {
  const deck = []
  for (let i = 0; i < cards.length / 13; i++) {
    deck.push(<DeckCard name="AS" disabled />)
  }

  return (
    <Deck onClick={onClick}>
      { deck }
    </Deck>
  )
}

const Deck = styled.div`
  position: relative;
`

const DeckCard = styled(Card)`
  position: absolute;
  border: 1px solid lightgrey;
  border-radius: 10px;

  &:nth-child(1) {
    left: 0;
    bottom: 0;
  }

  &:nth-child(2) {
    left: 4px;
    bottom: 4px;
  }

  &:nth-child(3) {
    left: 8px;
    bottom: 8px;
  }

  &:nth-child(4) {
    left: 12px;
    bottom: 12px;
  }
`

export default CardDeck
