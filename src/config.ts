import { Player } from "./player"
import { Point } from "./utils"
import { Wall } from "./wall"

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const width = 26
const height = 15

canvas.width = width
canvas.height = height

const ctx = canvas.getContext('2d')

const colors: Record<string, string> = {
  S: '#fc0',
  s: '#ff0',
  E: '#ccc',
  e: '#aaa',
  X: '#f00',
  x: '#c00',
  o: '#5fa',
  '#': '#755',
  '.': '#3a3a5a',
  ',': '#303050',
}

const keymaps: Record<string, string> = {
  a: '0.left',
  d: '0.right',
  w: '0.up',
  s: '0.down',
  q: '0.reverse',
  ' ': '0.start',
  r: '0.restart',

  'gamepad0.+x': '0.right',
  'gamepad0.-x': '0.left',
  'gamepad0.+y': '0.down',
  'gamepad0.-y': '0.up',
  'gamepad0.1': '0.reverse',
  'gamepad0.9': '0.start',
  'gamepad0.8': '0.restart',

  j: '1.left',
  l: '1.right',
  i: '1.up',
  k: '1.down',
  u: '1.reverse',
  // ' ': '1.start',
  // r: '1.restart',
}

const board: string[][] = []
const fruit: Point = {
  x: 17,
  y: 7,
}

const players: Player[] = []
const walls: Wall[] = []
const intervalId: number | undefined = 0

export const game = {
  paused: true,
  width,
  height,
  ctx,
  colors,
  keymaps,
  fruit,
  board,
  players,
  walls,
  intervalId,
  newMatch() {},
  endMatch() {}
}
