import fs from 'fs'
import path from 'path'

export const loadInput = (year: string, day: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const resolvedPath = path.join(process.cwd(), year, day, 'input.txt')
    console.log('🚀 ~ file: load-input.ts:7 ~ returnnewPromise ~ process.cwd()', process.cwd())
    console.log('resolvedPath: ', resolvedPath)
    // const resolvedPath = resolve(path)
    const stream = fs.createReadStream(resolvedPath)
    let data = ''

    stream.on('data', chunk => {
      data += chunk
    })

    stream.on('error', err => {
      reject(err)
    })

    stream.on('end', () => {
      resolve(data)
    })
  })
}

// loadInput('1').then(data => console.log('done, data: ', data))
