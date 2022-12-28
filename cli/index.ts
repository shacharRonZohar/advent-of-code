#!/usr/bin/env ts-node-esm

import fs from 'fs'
import { Command } from 'commander'
import config from './config.json' assert { type: 'json' }

const program = new Command()

program.option('-y, --year [year]', 'year to run').name('advent-of-code').version('0.0.1')

program
  .command('new-day <day>')
  .description('Create a new day')
  .action(async day => {
    console.log('Creating new day', day)
    const year = program.opts()?.year || (config.currYear ?? new Date().getFullYear())
    await fs.promises.mkdir(`../${year}/day${day}`)
    await fs.promises.mkdir(`../${year}/day${day}/part1`)
    await fs.promises.mkdir(`../${year}/day${day}/part2`)
    await Promise.all([
      fs.promises.writeFile(`../${year}/day${day}/part1/index.ts`, 'Merry Coding!'),
      fs.promises.writeFile(`../${year}/day${day}/part2/index.ts`, 'Merry Coding!'),
    ])
    fs.createReadStream('./inputception.txt', { encoding: 'utf8' }).pipe(fs.createWriteStream(`./day${day}/input.txt`))
  })

program
  .command('run-day <day> <part>')
  .description('Run a day')
  .action(async (day, part) => {
    console.log('Running day', day)
    const year = program.opts()?.year || (config.currYear ?? new Date().getFullYear())
    const { default: run } = await import(`../${year}/day${day}/part${part}/index.ts`)
    const res = run()
    fs.promises.writeFile(`../${year}/day${day}/part${part}/output.txt`, JSON.stringify(res))
  })

program
  .command('start-year')
  .description('Create a new year')
  .action(async () => {
    try {
      console.log('Creating new year')
      const year = program.opts()?.year || (config.currYear ?? new Date().getFullYear())
      await fs.promises.mkdir(`./${year}`)
      console.log('Year created', year)
    } catch (e) {
      console.log('Cannot create year, it probably already exists')
    }
    // await Promise.all(createAllDays())
  })

program
  .command('set-year [year]')
  .description('Set the current year. If no year is provided, it will remove the current year.')
  .action(async year => {
    console.log('Setting current year', year)
    config.currYear = year ?? null
    await fs.promises.writeFile('./config.json', JSON.stringify(config, null, 2))
    console.log('Year set to', year ?? null)
  })

program.parse(process.argv)

// const createAllDays = () => {
//   const days = Array.from({ length: 25 }, (_, i) => i + 1)
//   return days.map(day => fs.promises.mkdir(`./${year}/day${day}`))
// }
