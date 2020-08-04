import React from 'react'
import styled from 'styled-components'

function Scoreboard({ ICONS, JOKER, nRound, players, scores }) {

  const BODY = scores.length && scores.map((round, index) => (
    <Row key={index} current={nRound === index}>
      <Cell>{ ICONS[JOKER[index]] }</Cell>
      { round.map((score, index) => <Cell n={players.length} winner={index === round.winner}>{ score > -1 ? score : '' }</Cell>) }
    </Row>
  ))

  const total = []

  for(const round of scores) {
    for(const p in players) {
      const score = (round[p] > -1) ? round[p] : 0
      if(total[p])  total[p] += score
      else          total[p] = score
    }
  }

  BODY.push(
    <Row total>
      <Cell total> Total </Cell>
      { total.map((score, index) => <Cell n={players.length}>{ score }</Cell>) }
    </Row>
  )

  return (
    <Scores>
      <Head>
        <Row>
          <Column></Column>
          { players.map(player => <Column n={players.length}>{ player.name }</Column>) }
        </Row>
      </Head>
      <Body>
        { BODY }
      </Body>
    </Scores>
  )
}

const Scores = styled.table`
  border-collapse: collapse;
  color: black;
  width: 100%;
  height: 100%;
  table-layout: fixed;
  font-size: 0.9rem;
`

const Head = styled.thead``
const Column = styled.th`
  font-weight: 600;
  padding: 5px;
  border: 1px solid #e1e2e3;
  width: ${props => props.n ? '100px' : '50px'};
  ${props => props.index && `
    width: 30px;
  `};
`

const Body = styled.tbody``
const Row = styled.tr`
  ${props => props.total && `
    background: #BF3B53;

    & > * {
      font-weight: 500;
      color: white !important;
      border: 1px solid #BF3B53 !important;
    }
  `};

  background: ${props => props.current && '#f2f3f4'};
`

const Cell = styled.td`
  text-align: center;
  border: 1px solid #e1e2e3;
  color: grey;
  padding: 5px;
  width: ${props => (100 / props.n) }%;

  ${props => props.winner && `
    color: #BF3B53;
    background: rgba(191, 59, 83, 0.15);
  `}

  ${props => props.total && `
    background: black;
    border: 1px solid black !important;
  `};

  ${props => props.index && `
    color: black;
  `};
`

export default Scoreboard
