import React from 'react'
import styled from 'styled-components'

function Player({ name, ready, host, isHost, removePlayer }) {
  return (
    <Box ready={ready}>
      {name}
      {host ? <Crown className="fa fa-crown" /> : (isHost && <Cross ready={ready} onClick={() => removePlayer(name)} className="fa fa-times" />)}
    </Box>
  )
}

const Box = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding: 12px;
  color: ${props => props.ready ? 'white' : 'grey' };
  background: ${props => props.ready ? '#BF3B53' : 'rgba(0,0,0,0.1)' };
  font-weight: 500;
  letter-spacing: 0.2px;
  border-radius: 5px;
  font-size: 1rem;
`

const Crown = styled.i`
  color: gold;
`

const Cross = styled.i`
  color: ${props => props.ready ? 'rgba(0,0,0,0.3)' : 'darkgrey' };
`

export default Player
