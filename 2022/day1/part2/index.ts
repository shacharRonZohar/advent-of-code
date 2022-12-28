import fs from 'fs'
;(() => {
  const firstSplitSymbol = '\n\r'
  const secondSplitSymbol = '\n'
  const ans = fs
    .readFileSync('./input.txt', 'utf8')
    .split(firstSplitSymbol)
    .reduce((allCalories, group) => {
      allCalories.push(
        group.split(secondSplitSymbol).reduce((calories, line) => {
          return calories + +line
        }, 0),
      )
      return allCalories
    }, [])
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, calories) => sum + calories, 0)
  console.log(ans)
})()
