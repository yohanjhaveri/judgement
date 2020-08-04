import React from 'react'
import styled from 'styled-components'

function Gameover({ players, gameWinner }) {
  return (
    <Center>
      <HandBoard>
        <h2> <Crown className="fa fa-crown" /> { players[gameWinner].name } has won the game! </h2>
      </HandBoard>
    </Center>
  )
}

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

const Crown = styled.i`
  color: gold;
`

export default Gameover
