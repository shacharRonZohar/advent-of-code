import fs from 'fs'
;(() => {
  const firstSplitSymbol = '\r\n'
  const ans = fs
    .readFileSync('./input.txt', 'utf8')
    .split(firstSplitSymbol)
    .reduce((totalScore, pair) => {
      const [first, second] = pair.split(' ')
      return totalScore + getRoundScore(first, second)
    }, 0)

  console.log(ans)
})()

function getRoundScore(first, second) {
  let score = getShapeScore(second)
  if (isFightDrawn(first, second)) score += 3
  else if (isFightWon(first, second)) score += 6
  return score
}

function getShapeScore(shape) {
  const shapeScoreMap = new Map(
    Object.entries({
      X: 1,
      Y: 2,
      Z: 3,
    }),
  )
  return shapeScoreMap.get(shape)
}

function isFightWon(first, second) {
  const shapeFightMap = new Map(
    Object.entries({
      X: 'C',
      Y: 'A',
      Z: 'B',
    }),
  )
  return shapeFightMap.get(second) === first
}

function isFightDrawn(first, second) {
  const shapeEqualityMap = new Map(Object.entries({ X: 'A', Y: 'B', Z: 'C' }))
  return shapeEqualityMap.get(second) === first
}
