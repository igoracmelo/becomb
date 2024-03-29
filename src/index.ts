// import { Wall } from './wall'
import { Player } from './player.js'
// import { $ } from './utils'
// import { $, createMatrix, randomPosition } from './utils'
import { $, createMatrix } from './utils'
import { game } from './config'

// const { game.width, game.height, game.colors, game.keymaps } = game
// const emptyBoard = copy(game.board)

// function copy(obj) {
//   return JSON.parse(JSON.stringify(obj))
// }

const canvas = $('#canvas') as HTMLCanvasElement
const fullscreen = $('#fullscreen') as HTMLButtonElement

fullscreen.onclick = () => {
  const requestFullScreen = canvas.requestFullscreen //|| canvas.webkitRequestFullScreen
  requestFullScreen.call(canvas)
  game.paused = !game.paused
}

game.endMatch = function () {
  game.paused = true
  clearInterval(game.intervalId)
}

game.newMatch = function () {
  // debugger
  game.paused = true
  clearInterval(game.intervalId)
  game.intervalId = setup()
}

window.onkeydown = (e) => {
  const command = game.keymaps[e.key]
  if (command) {
    const [i, fn] = command.split('.')

    // @ts-ignore
    // TODO: solution for this
    game.players[parseInt(i)][fn]()
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

let gamepadEnabled = false
let gamepads = []

window.addEventListener('gamepadconnected', () => {
  gamepadEnabled = true
})

function setup(): number {
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
  return setInterval(loop, 100) ?? 0
}

function loop() {
  if (!game.ctx) return

  if (gamepadEnabled) {
    gamepads = navigator.getGamepads()
    gamepads.forEach((gamepad, i) => {
      if (!gamepad) return
      const x = gamepad.axes[0]
      const y = gamepad.axes[1]

      const button = gamepad.buttons.findIndex(b => b.pressed)
      let map = `gamepad${i}.${button}`

      if (x || y) {
        if (x > 0) {
          map = `gamepad${i}.+x`
        } else if (x < 0) {
          map = `gamepad${i}.-x`
        }

        if (y > 0) {
          map = `gamepad${i}.+y`
        } else if (y < 0) {
          map = `gamepad${i}.-y`
        }
      }

      let command = game.keymaps[map]

      // @ts-ignore
      // TODO: solution for this
      if (command && command !== gamepad.previousCommand) {
        const [i, fn] = command.split('.')

        // @ts-ignore
        // TODO: solution for this
        game.players[i][fn]()

        // @ts-ignore
        // TODO: solution for this
        gamepad.previousCommand = command
      }
    })
  }

  game.players.forEach((p) => {
    p.erase()
  })


  game.ctx.fillStyle = '#335'
  game.ctx.fillRect(0, 0, game.width, game.height)

  game.ctx.fillStyle = '#f00'
  game.ctx.fillRect(0, 0, 1, 1)

  // if (game.board[game.fruit.y])
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
