import { game } from './config'

export class Wall {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  draw() {
    game.board[this.y][this.x] = '#'
  }
}