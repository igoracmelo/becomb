export function randomPosition(maxX, maxY, validations = []) {
  let x, y
  do {
    x = parseInt(Math.random() * maxX)
    y = parseInt(Math.random() * maxY)
    // debugger
  } while (!validations.every((v) => !v || v(x, y)))
  return { x, y }
}

export function pointsIntersect() {
  const points = [...arguments]
  const ref = points[0]
  return points.every((point) => ref.x === point.x && ref.y === point.y)
}

export function createMatrix(lines, cols, string) {
  const res = []
  for (let l = 0; l < lines; l++) {
    res.push([])
    for (let c = 0; c < cols; c++) {
      res[l].push(string)
    }
  }
  return res
}