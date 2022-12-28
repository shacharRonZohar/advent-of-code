import fs from 'fs'

export const loadInput = (path: string) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(`${path}/input.txt`)
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
