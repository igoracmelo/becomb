import { randomPosition, pointsIntersect } from './utils.js'
import { game } from './config.js'

// const { game.width, game.height } = game
// import { game } from './index.js'

// import { ctx, game.width, game.height, colors, keymaps } from './config.js'

export class Player {
  directions = {
    left: 'right',
    up: 'down',
    right: 'left',
    down: 'up',
  }
  facing = 'right'
  moveSpeed = 1
  moved = true
  speed = { x: 0, y: 0 }
  body = []
  charHead = 'E'
  charBody = 'e'
  enemyHead = 'S'
  enemyBody = 's'
  score = 0
  isPlayer1 = false

  constructor({ x, y, maxX, maxY, isPlayer1}) {
    this.maxX = maxX
    this.maxY = maxY
    this.isPlayer1 = isPlayer1

    if (isPlayer1) {
      // this.moveSpeed = 2
      this.charHead = 'S'
      this.charBody = 's'

      this.enemyHead = 'E'
      this.enemyBody = 'e'
    }

    for (let x0 = x; x0 > x - 3; x0--) {
      this.body.push({
        x: x0,
        y,
      })
    }
  }

  get head() {
    return this.body[0]
  }

  reverse() {
    this.body = this.body.reverse()
    this.speed.x *= -1
    this.speed.y *= -1
    this.facing = this.directions[this.facing]
  }

  draw() {
    for (const part of this.body) {
      game.board[part.y][part.x] = this.charBody
    }
    game.board[this.head.y][this.head.x] = this.charHead
    setTimeout(() => (this.moved = true))
  }

  erase() {
    for (const part of this.body) {
      // debugger
      game.board[part.y][part.x] = '.'
    }
  }

  eat() {
    this.score++
    this.body.push({ ...this.body.at(-1) })
    // cleanTile(this.head.x, this.head.y)
    game.board[this.head.y][this.head.x] = '.'
    game.fruit = randomPosition(game.width - 1, game.height - 1, [
      (x, y) => !game.players.some((p) => p.body.some((b) => b.x === x && b.y === y)),
      (x, y) => !game.walls.some((w) => w.x === x && w.y === y),
    ])
  }

  die() {
    this.charHead = 'X'
    this.charBody = 'x'
    // clearInterval(intervalId)
    game.endMatch()
    return
  }

  move() {
    const others = game.players.filter((p) => p !== this)

    this.body[-1] = this.nextHead()
    for (let i = this.body.length - 1; i >= 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y

      // if (i && pointsIntersect([this.body[i], this.head])) {
      //   console.log(i)
      //   console.log(this.body[i])
      //   this.die()
      //   clearInterval(intervalId)
      //   return
      // }
    }

    for (const other of others) {
      if (pointsIntersect(other.nextHead(), this.head) || pointsIntersect(other.head, this.head)) {
        other.die()
        this.die()
      }

      for (let i = 1; i < other.body.length - 1; i++) {
        if (pointsIntersect(other.body[i], this.head)) {
          this.die()
        }
      }
    }

    if (game.board[this.head.y][this.head.x] === 'o') {
      this.eat()
    }

    if (game.board[this.head.y][this.head.x] === '#') {
      this.die()
    }
  }

  nextHead() {
    return {
      x: (this.head.x + this.speed.x + this.maxX) % this.maxX,
      y: (this.head.y + this.speed.y + this.maxY) % this.maxY,
    }
  }

  left() {
    if (!this.moved) return

    if (this.facing !== 'right') {
      this.speed.x = -this.moveSpeed
      this.speed.y = 0
      this.facing = 'left'
    }
  }

  right() {
    if (!this.moved) return

    if (this.facing !== 'left') {
      this.speed.x = +this.moveSpeed
      this.speed.y = 0
      this.facing = 'right'
    }
  }

  up() {
    if (!this.moved) return

    if (this.facing !== 'down') {
      this.speed.y = -this.moveSpeed
      this.speed.x = 0
      this.facing = 'up'
    }
  }

  down() {
    if (!this.moved) return

    if (this.facing !== 'up') {
      this.speed.y = +this.moveSpeed
      this.speed.x = 0
      this.facing = 'down'
    }
  }
}
