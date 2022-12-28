import fs from 'fs'
;(() => {
  const firstSplitSymbol = '\n\r'
  const secondSplitSymbol = '\n'
  const ans = Math.max(
    ...fs
      .readFileSync('./input.txt', 'utf8')
      .split(firstSplitSymbol)
      .reduce((allCalories, group) => {
        allCalories.push(
          group.split(secondSplitSymbol).reduce((calories, line) => {
            return calories + +line
          }, 0),
        )
        return allCalories
      }, []),
  )
  console.log(ans)
})()
