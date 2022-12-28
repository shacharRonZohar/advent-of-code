import fs from 'fs'
const shapeScoreMap = new Map(
  Object.entries({
    A: 1,
    B: 2,
    C: 3,
  }),
)
const shapeFightMap = new Map(
  Object.entries({
    A: 'C',
    B: 'A',
    C: 'B',
  }),
)
;(() => {
  const firstSplitSymbol = '\r\n'
  const ans = fs
    .readFileSync('./input.txt', 'utf8')
    .split(firstSplitSymbol)
    .reduce((totalScore, pair) => {
      const [opShape, whatDo] = pair.split(' ')
      return totalScore + getRoundScore(opShape, whatDo)
    }, 0)

  console.log(ans)
})()

function getRoundScore(opShape, whatDo) {
  const shape = getShapeForFight(opShape, whatDo)
  let score = getShapeScore(shape)
  if (whatDo === 'Y') score += 3
  if (whatDo === 'Z') score += 6
  return score
}

function getShapeForFight(opShape, whatDo) {
  if (whatDo === 'X') return shapeFightMap.get(opShape)
  if (whatDo === 'Y') return opShape
  if (whatDo === 'Z') return shapeFightMap.get(shapeFightMap.get(opShape))
}

function getShapeScore(shape) {
  return shapeScoreMap.get(shape)
}
