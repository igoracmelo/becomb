import { Wall } from './wall.js'
import { Player } from './player.js'
import { createMatrix, randomPosition } from './utils.js'
import { game } from './config.js'

// const { game.width, game.height, game.colors, game.keymaps } = game
// const emptyBoard = copy(game.board)

// function copy(obj) {
//   return JSON.parse(JSON.stringify(obj))
// }

fullscreen.onclick = () => {
  const requestFullScreen = canvas.requestFullScreen || canvas.webkitRequestFullScreen
  requestFullScreen.call(canvas)
}

game.endMatch = function () {
  this.paused = true
  clearInterval(this.intervalId)
}

game.newMatch = function () {
  // debugger
  this.paused = true
  clearInterval(this.intervalId)
  this.intervalId = setup()
}

window.onkeydown = (e) => {
  const command = game.keymaps[e.key]
  if (command) {
    const [i, fn] = command.split('.')
    game.players[i][fn]()
  }

  if (e.key === ' ') {
    game.paused = false
  }

  if (e.key === 'r') {
    game.newMatch()
  }
}

// function cleanTile(x, y) {
//   game.board[y][x] = '.'
// }

// let fruit

// let game.paused = true
// let p1, p2
// let intervalId

// let game.board = []
// let players = []
// game.walls = []

// for (let l = 0; l < game.height; l++) {
//   game.board.push([])
//   for (let c = 0; c < game.width; c++) {
//     game.board[l].push('.')
//   }
// }

// function clearBoard() {
//   for (let l = 0; l < game.height; l++) {
//     for (let c = 0; c < game.width; c++) {
//       game.board[l][c] = '.'
//     }
//   }
// }

function setup() {
  // clearBoard()
  game.board = createMatrix(game.height, game.width, '.')
  // window.game.board = game.board
  // debugger

  const p1 = new Player({
    x: 5,
    y: 5,
    maxX: game.width,
    maxY: game.height,
    isPlayer1: true,
  })

  const p2 = new Player({
    x: 5,
    y: game.height - 6,
    maxX: game.width,
    maxY: game.height,
  })

  // players.push(p1)
  // players.push(p2)
  game.players = [p1, p2]
  // window.players = players

  game.walls = []
  // for (let i = 0; i < 10; i++) {
  //   const { x, y } = randomPosition(game.width - 1, game.height - 1, [
  //     (x, y) => !game.players.some((player) => player.body.some((part) => part.x === x && part.y === y)),
  //   ])

  //   // debugger
  //   game.walls.push(new Wall(x, y))
  // }

  game.players.forEach((p) => p.right())

  game.fruit = {
    x: 17,
    y: 7,
  }

  loop()
  return setInterval(loop, 100)
}

function loop() {
  game.players.forEach((p) => {
    p.erase()
  })

  game.ctx.fillStyle = '#335'
  game.ctx.fillRect(0, 0, game.width, game.height)

  game.ctx.fillStyle = '#f00'
  game.ctx.fillRect(0, 0, 1, 1)

  game.board[game.fruit.y][game.fruit.x] = 'o'

  game.players.forEach((p) => {
    // p.erase(game.board)
    !game.paused && p.move()
    p.draw()
  })

  game.walls.forEach((w) => {
    w.draw()
  })

  for (let l = 0; l < game.height; l++) {
    for (let c = 0; c < game.width; c++) {
      let style = game.colors[game.board[l][c]]
      if (game.board[l][c] == '.' && (l + c) % 2 == 0) {
        style = game.colors[',']
      }
      game.ctx.fillStyle = style
      game.ctx.fillRect(c, l, 1, 1)
    }
  }
}

game.newMatch()
