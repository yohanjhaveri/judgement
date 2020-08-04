import React from 'react'
import styled from 'styled-components'

function Load() {
  const ICONS = {
    H: <i className="fas fa-heart"></i>,
    D: <i className="fas fa-diamond"></i>,
    S: <i className="fas fa-spade"></i>,
    C: <i className="fas fa-club"></i>
  }

  return (
    <Screen>
      <Box>
        <Spinner />
      </Box>
    </Screen>
  )
}

// <Suits>
//   <Suit className="fa fa-spade"></Suit>
//   <Suit className="fa fa-heart"></Suit>
//   <Suit className="fa fa-club"></Suit>
//   <Suit className="fas fa-diamond"></Suit>
// </Suits>

const Screen = styled.div`
  padding: 20px;
  font-family: Avenir, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  display: flex;
  grid-gap: 10px;
  font-size: 3rem;
  align-items: center;
`

const Suits = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

const Suit = styled.div`
  font-size: 1.8rem;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: blinker 0.5s cubic-bezier(.5, 0, 1, 1) infinite alternate;

  @keyframes blinker {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`

const Spinner = styled.span`
  display: inline-block;
  color: #BF3B53;
  width: 2.5rem;
  height: 2.5rem;
  vertical-align: middle;
  border: 0.3rem solid currentColor;
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

export default Load
