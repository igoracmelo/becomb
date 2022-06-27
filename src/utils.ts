export type Point = { x: number, y: number }

export function randomPosition(maxX: number, maxY: number, validations: Function[] = []) {
  let x: number
  let y: number
  do {
    x = Math.floor(Math.random() * maxX)
    y = Math.floor(Math.random() * maxY)
    // debugger
  } while (!validations.every((v) => !v || v(x, y)))
  return { x, y }
}

export function pointsIntersect(...points: Point[]) {
  // const points = [...arguments]
  const ref = points[0]
  return points.every((point) => ref.x === point.x && ref.y === point.y)
}

export function createMatrix(lines: number, cols: number, string: string) {
  const res: string[][] = []
  for (let l = 0; l < lines; l++) {
    res.push([])
    for (let c = 0; c < cols; c++) {
      res[l].push(string)
    }
  }
  return res
}

export const $ = document.querySelector.bind(document)
// export const $$ = (q: string) => [...document.querySelectorAll(q)]