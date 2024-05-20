'use server'

/* eslint-disable import/prefer-default-export */

import pg from 'pg'

const { Pool } = pg

export const createPool = (database) => {
  const connectionString = `${process.env.CONNECTION_STRING_URL}/${database}?${process.env.CONNECTION_STRING_SETTINGS}`
  const pool = new Pool({
    connectionString,
  })
  pool.on('error', (err, client) => {
    console.log('Client: ', client)
    console.error('Unexpected error client', err)
    process.exit(-1)
  })
  return pool
}
