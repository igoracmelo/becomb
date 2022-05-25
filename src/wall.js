export class Wall {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  draw() {
    game.board[this.y][this.x] = '#'
  }
}