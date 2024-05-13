/* eslint-disable import/prefer-default-export */
import fs from 'fs'

export function readFileStream(filePath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' })
    let data = ''

    readStream.on('data', (chunk) => {
      data += chunk
    })

    readStream.on('error', (error) => {
      console.error('Error reading file:', error)
      reject(error) // Reject the promise on error
    })

    readStream.on('end', () => {
      console.log('Finished reading the file.')
      resolve(data) // Resolve the promise with the data
    })
  })
}
