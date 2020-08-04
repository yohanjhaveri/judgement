import React, { useState, useEffect } from 'react'
import Game from 'project/Game/Game'
import Join from 'project/Join/Join'
import Room from 'project/Room/Room'
import Load from 'project/Load/Load'

import { generateGame, setPath, clearPath, checkGameExists } from 'helpers'
import fire from 'fire'

function App() {
  const [load, setLoad] = useState(false)
  const [code, setCode] = useState(null)
  const [name, setName] = useState('')
  const [game, setGame] = useState(null)
  const [state, setState] = useState('load')
  const [round, setRound] = useState(0)

  useEffect(() => {
    const path = window.location.href.split('/')[window.location.href.split('/').length - 1]
    if(path) {
      checkGameExists(path)
      .then(() => setCode(path))
      .catch(() => {
        setState('create')
        clearPath()
      })
    } else {
      setState('create')
    }
  }, [])

  useEffect(() => {
    if(code) {
      setPath(code)
      fire.database().ref('game').child(code).on('value', data => {
        setGame(data.val())
        setLoad(false)
      })
    }
  }, [code])

  useEffect(() => {
    if(game) {
      const localName = localStorage.getItem('declare-' + code)
      const existName = game.players.find(player => player.name === localName)
      if(existName) {
        reroute()
        setName(localName)
      } else {
        setName('')
        setState('join')
      }
    }
  }, [game])

  useEffect(() => {
    if(game) {
      const localName = localStorage.getItem('declare-' + code)
      localStorage.setItem('declare-' + code, name)
      if(name === '' && localName) alert('You have been kicked')
      reroute()
    }
  }, [name])

  const reroute = () => {
    if(name) {
      if(game.active) {
        setState('game')
      } else {
        setState('room')
      }
    }
  }

  const createGame = name => {
    if(name) {
      setLoad(true)
      const { gameCode, gameData } = generateGame(name)
      fire.database().ref('game').child(gameCode).set(gameData).then(() => {
        setCode(gameCode)
        localStorage.setItem('declare-' + gameCode, name)
      })
    }
  }


  const joinGame = name => {
    if(name && !game.players.find(player => player.name === name)) {
      setLoad(true)
      fire.database().ref('game').child(code).update({ players: game.players.concat([{ name, ready: false }]) })
      localStorage.setItem('declare-' + code, name)
    }
  }


  const current = () => {
    switch(state) {
      case 'load': return <Load />
      case 'game': return <Game code={code} player={name} game={game} />
      case 'room': return <Room name={name} game={game} code={code} />
      case 'join': return <Join load={load} joinGame={joinGame} />
      case 'create': return <Join load={load} create={true} createGame={createGame} />
    }
  }

  return current()
}

export default App




















//
// useEffect(() => {
//   const url = new URL(window.location)
//   const { pathname } = url
//   const path = pathname.slice(1)
//   if(path){
//     setCode(path)
//   }
// }, [])
//
// useEffect(() => {
//   const ref = fire.database().ref('game').child(code)
//   ref.on('value', data => {
//     const gameData = data.val()
//     if(gameData) {
//       setGame(gameData)
//     } else {
//       if(code !== 'invalid') clearPath()
//     }
//     setFetched(true)
//   })
// }, [code])
//
// useEffect(() => {
//   if(fetched) {
//     if(game && game.active) {
//       setState('room')
//     }
//     setState('join')
//   }
// }, [fetched])
//
// useEffect(() => {
//   if(playerName) {
//     setState('room')
//   }
// }, [playerName])
