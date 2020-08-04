import cryptoRandomString from 'crypto-random-string'
import fire from 'fire'

const generateGame = name => {
  const code = cryptoRandomString({length: 10});
  return {
    gameCode: code,
    gameData: { active: false, players: [{ name, ready: true }] }
  }
}

const distributeCards = (numPlayers, numCards) => {
  const CARDS = [
    'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS',
    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH',
    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC',
    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD',
  ]

  const getRandomCard = () => {
    const random = Math.floor(Math.random() * CARDS.length)
    const picked = CARDS[random]
    CARDS.splice(random, 1)
    return picked
  }

  const distribution = []

  for(let i = 0; i < numPlayers; i++) {
    distribution.push([]);
    for(let j = 0; j < numCards; j++) {
      const card = getRandomCard();
      distribution[i].push(card);
    }
  }

  return distribution
}

const generateGameStructure = players => {
  const n = players.length
  return {
    players,
    active: true,
    nRound: 0,
    nHand: 0,
    start: 0,
    turn: 0,
    hand: createArray(n, ''),
    made: createArray(n, 0),
    predicted: createArray(n, -1),
    cards: distributeCards(n, 7),
    status: 'announcing',
    scores: createArray(14, createArray(n, -1)),
    winner: -1,
    gameWinner: -1
  }
}

const createArray = (len, itm) => {
  var arr1 = [itm],
    arr2 = [];
  while (len > 0) {
    if (len & 1) arr2 = arr2.concat(arr1);
    arr1 = arr1.concat(arr1);
    len >>>= 1;
  }
  return arr2;
}

const clearPath = () => {
  const url = new URL(window.location);
  url.pathname = ''
  window.history.pushState({}, null, url);
}

const setPath = path => {
  const url = new URL(window.location);
  url.pathname = path
  window.history.pushState({}, null, url);
}

const checkGameExists = code => new Promise((resolve, reject) => {
  fire.database().ref('game').child(code).once('value')
  .then(data => {
    const gameData = data.val()
    if(gameData) {
      resolve()
    } else {
      reject()
    }
  })
})

const findWinner = (hand, joker, start) => {

  const primarySuit = hand[start][1]

  const VALUE_ORDER = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
  const SUITS = ['S', 'H', 'C', 'D']
  const SUIT_ORDER = SUITS.filter(suit => !(suit === primarySuit || suit === joker))
  SUIT_ORDER.push(primarySuit)
  SUIT_ORDER.push(joker)

  const cards = [...hand]

  cards.sort(function(x, y) {
    const xVALUE = VALUE_ORDER.indexOf(x[0])
    const yVALUE = VALUE_ORDER.indexOf(y[0])

    const xSUIT = SUIT_ORDER.indexOf(x[1])
    const ySUIT = SUIT_ORDER.indexOf(y[1])

    if(xSUIT === ySUIT) {
      if(xVALUE < yVALUE) return -1;
      if(xVALUE > yVALUE) return 1;
    } else {
      if(xSUIT < ySUIT) return -1;
      if(xSUIT > ySUIT) return 1;
    }
  })
  return hand.indexOf(cards.pop())
}

const findGameWinner = (players, scores) => {
  const total = []

  for(const round of scores) {
    for(const p in players) {
      const score = (round[p] > -1) ? round[p] : 0
      if(total[p])  total[p] += score
      else          total[p] = score
    }
  }

  return total.indexOf(Math.max(total))
}

export { generateGame, generateGameStructure, clearPath, setPath, checkGameExists, findWinner, createArray, distributeCards, findGameWinner }
