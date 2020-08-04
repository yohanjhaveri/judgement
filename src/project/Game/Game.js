import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { createArray, distributeCards, findWinner, findGameWinner } from 'helpers'

import Announcement from 'project/Announcement'
import Scoreboard from 'project/Game/Scoreboard'
import Predictions from 'project/Game/Predictions'
import Player from 'project/Game/Player'
import Card from 'project/Game/Card'
import Playing from 'project/Game/Playing'
import Predicting from 'project/Game/Predicting'
import Gameover from 'project/Game/Gameover'
import RoundResult from 'project/Game/RoundResult'

import fire from 'fire'

function Game({ code, player, game }) {
  const { active, nRound, gameWinner, nHand, players, start, turn, hand, made, predicted, cards, status, scores, winner } = game
  const n = players.length
  const ref = fire.database().ref('game').child(code)
  const playerID = players.findIndex(p => p.name === player)

  const N_CARDS = [7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7];
  const ROUND_START = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => i % n)
  const JOKER = ['S', 'H', 'C', 'D', 'S', 'H', 'C', 'D', 'S', 'H', 'C', 'D', 'S', 'H']

  const nCards = N_CARDS[nRound]
  const roundStart = ROUND_START[nRound]
  const joker = JOKER[nRound]

  if(status === 'round-result' && (turn === playerID)) {
    setTimeout(() => {
      ref.update({ status: 'announcing' })
    }, 2000)
  }

  if(status === 'announcing' && (turn === playerID)) {
    setTimeout(() => {
      ref.update({ status: 'predicting' })
    }, 3000)
  }

  const makePrediction = prediction => {
    predicted[turn] = prediction

    const updates = {
      predicted,
      turn: (turn + 1) % n
    }

    if(predicted.every(p => p !== -1)) {
      const findMaxIndex = array => array.indexOf(Math.max.apply(null, array))
      updates.status = 'playing'
      updates.start = findMaxIndex(predicted)
      updates.turn = findMaxIndex(predicted)
    }

    ref.update(updates)
  }

  const playCard = card => {
    if(turn === playerID) {
      hand[turn] = card
      cards[turn] = cards[turn].filter(c => c !== card)

      const updates = {
        hand,
        cards,
        turn: (turn + 1) % n,
      }

      const handOver = hand.every(c => c)
      const roundOver = nHand === nCards - 1
      const gameOver = nRound ===  13

      if(handOver) { // HAND IS COMPLETE
        const winner = findWinner(hand, joker, start)
        made[winner] += 1

        ref.update({ cards, winner, hand, turn: -1 })

        Object.assign(updates, {
          made,
          hand: createArray(n, ''),
          nHand: nHand + 1,
          winner: -1,
          start: winner,
          turn: winner
        })

        if(roundOver) { // ROUND IS COMPLETE
          for(let p in players) {
            scores[nRound][p] = predicted[p] === made[p] ? (10 + made[p]) : 0
          }

          Object.assign(updates, {
            scores,
            made: createArray(n, 0),
            predicted: createArray(n, -1),
            nHand: 0,
            nRound: nRound + 1,
            start: ROUND_START[nRound + 1],
            turn: ROUND_START[nRound + 1],
            cards: distributeCards(n, N_CARDS[nRound + 1]),
          })
        }

      }
      if(handOver) {
        setTimeout(() => {
          ref.update(updates)

          if(roundOver) {
            ref.update({ status: 'round-result' })

            if(gameOver) {
              ref.update({ status: 'finished', gameWinner: findGameWinner(players, scores) })
            }
          }
        }, 2000)
      } else {
        ref.update(updates)
      }
    }
  }

  const ICONS = {
    H: <i className="fas fa-heart"></i>,
    D: <i className="fas fa-diamond"></i>,
    S: <i className="fas fa-spade"></i>,
    C: <i className="fas fa-club"></i>
  }

  const current = () => {
    switch(status) {
      case 'finished':      return <Gameover players={players} gameWinner={gameWinner} />
      case 'playing':       return <Playing winner={winner} hand={hand} start={start} turn={turn} players={players} />
      case 'predicting':    return <Predicting makePrediction={makePrediction} nCards={nCards} predicted={predicted} start={start} turn={turn} players={players} playerID={playerID} />
      default:              return <div />
    }
  }


  const render = (
    <Screen n={n}>
      {
        status === 'announcing'
        ? <Announcement nRound={nRound} nHand={nHand} joker={ICONS[joker]} />
        : status === 'round-result'
          ? <RoundResult score={scores[nRound - 1][playerID]} />
          : <Play>
              <Info>
                <div>
                  <Title> {ICONS[joker]} Round {nRound + 1}</Title>
                  <Subtitle> Hand {nHand + 1} </Subtitle>
                </div>
                <Predictions made={made} predicted={predicted} players={players} />
              </Info>
              { current() }
              <Player turn={turn} hand={hand} cards={cards} start={start} playerID={playerID} playCard={playCard} />
            </Play>
      }
      <Scoreboard ICONS={ICONS} JOKER={JOKER} players={players} scores={scores} nRound={nRound} />
    </Screen>

  )

  return render
}

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`

const Screen = styled.div`
  padding: 20px;
  font-family: Avenir, sans-serif;
  display: grid;
  grid-template-columns: 1fr calc(50px + ${props => props.n * 100}px);
  height: 100vh;
  width: 100vw;
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
  margin-left: 35px;
  font-weight: 500;
`

const Cards = styled.h4`font-weight: 500; color: grey; padding: 5px;`
const Muted = styled.span`font-weight: 500; color: grey; padding: 5px; font-size: 1rem;`

const Play = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 200px;
  padding: 0 20px;
`

const Button = styled.button`
  background: ${
    props => {
      switch(props.color) {
        case 'blue': return '#377DFF'
        case 'green': return '#43AF7B'
        case 'red': return '#BF3B53'
      }
    }
  };
  font-size: 1rem;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  outline: none;
`

const Action = styled.div`
  text-align: center;
`

const Heading = styled.h1`
  margin-bottom: 0.6rem;

  color: ${
    props => {
      switch(props.color) {
        case 'blue': return '#377DFF'
        case 'green': return '#43AF7B'
        case 'red': return '#BF3B53'
        default: return 'black'
      }
    }
  };
`


export default Game
