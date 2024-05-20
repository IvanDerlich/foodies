'use server'

import { Client } from 'basic-ftp'

const ftpConfig = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  secure: true, // Recommended to use FTPS if supported
}

// eslint-disable-next-line import/prefer-default-export
export async function openConnection() {
  const connection = new Client()
  connection.ftp.verbose = true // Enable verbose output to see the communication with the server

  try {
    // Access FTP server
    await connection.access(ftpConfig)
    console.log('Connected to FTP server')
    return connection
  } catch (error) {
    console.error('Error connecting to FTP server:', error)
    throw error.message
  }
}
