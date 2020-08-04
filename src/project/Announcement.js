import React from 'react'
import styled from 'styled-components'

function Announcement({ nRound, joker }) {
  return (
    <Screen>
      <Box>
        <Title> Round {nRound + 1} </Title>
        <Subtitle> Joker {joker} </Subtitle>
      </Box>
    </Screen>
  )
}

const Screen = styled.div`
  padding: 20px;
  font-family: Avenir, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
`

const Subtitle = styled.h3`
  color: grey;
  font-size: 2.2rem;
  font-weight: 500;
`

export default Announcement
