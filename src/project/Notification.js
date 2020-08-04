import React from 'react'
import styled from 'styled-components'

function Notification() {
  return (
    <Screen>
      <Container>
        <Box>
          <Strip />
          <Message>
            You have been warned
          </Message>
        </Box>
      </Container>
    </Screen>
  )
}

const Screen = styled.main`
  font-family: Avenir, sans-serif;
  height: 100vh;
  width: 100vw;
  position: relative;
`


const Box = styled.div`
  background: rgb(235,236,237);
  margin-top: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
`

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  opacity: 0;

  visibility: visible;
  // -webkit-animation: fadein 0.5s 0, fadeout 0.5s 0;
  animation: fadein 3s, fadeout 3s;

  @-webkit-keyframes fadein {
    from {top: -30px; opacity: 0;}
    to {top: 30px; opacity: 1;}
  }

  @keyframes fadein {
    from {top: -30px; opacity: 0;}
    to {top: 30px; opacity: 1;}
  }

  @-webkit-keyframes fadeout {
    from {top: 30px; opacity: 1;}
    to {top: -30px; opacity: 0;}
  }

  @keyframes fadeout {
    from {top: 30px; opacity: 1;}
    to {top: -30px; opacity: 0;}
  }
`

const Message = styled.h3`
  padding: 20px;
`

const Strip = styled.div`
  background: #BF3B53;
  height: 100%;
  width: 5px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`

export default Notification
