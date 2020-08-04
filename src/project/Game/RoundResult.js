import React, { useState } from 'react'
import styled from 'styled-components'

function RoundResult({ score }) {
  return (
    <Center>
      {
        score
        ? (
            <div>
              <Title>You won this round!</Title>
              <Subtitle>Good job with your prediction!</Subtitle>
            </div>
          )
        : (
            <div>
              <Title>You lost this round!</Title>
              <Subtitle>Better luck next time!</Subtitle>
            </div>
          )
      }
    </Center>
  )
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 35px;
`

const Title = styled.h2`
  display: flex;
  grid-gap: 10px;
  font-size: 1.8rem;
  align-items: center;
`

const Subtitle = styled.h3`
  color: grey;
  font-size: 1.2rem;
  font-weight: 500;
`

export default RoundResult
