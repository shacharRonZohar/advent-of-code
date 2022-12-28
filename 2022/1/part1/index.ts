import { loadInput } from '../../../utils/load-input.js'

export default async () => {
  const firstSplitSymbol = '\n\r'
  const secondSplitSymbol = '\n'
  const input = await loadInput('2022', '1')
  const lines = input.split(firstSplitSymbol)
  const allCalories = lines.reduce((allCalories, group) => {
    const calories = group.split(secondSplitSymbol).reduce((calories, line) => {
      return calories + +line
    }, 0)
    allCalories.push(calories)
    return allCalories
  }, [] as number[])

  return Math.max(...allCalories)
}
