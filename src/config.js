const canvas = document.getElementById('canvas')

const width = 26
const height = 15

canvas.width = width
canvas.height = height

const ctx = canvas.getContext('2d')

const colors = {
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

const keymaps = {
  a: '0.left',
  d: '0.right',
  w: '0.up',
  s: '0.down',
  q: '0.reverse',

  j: '1.left',
  l: '1.right',
  i: '1.up',
  k: '1.down',
  u: '1.reverse',
}

export const game = {
  paused: true,
  width,
  height,
  ctx,
  colors,
  keymaps,
}