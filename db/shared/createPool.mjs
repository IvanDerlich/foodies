import pg from 'pg'

const { Pool } = pg

const createPool = (database) => {
  const connectionString = `${process.env.CONNECTION_STRING_URL}/${database}?${process.env.CONNECTION_STRING_SETTINGS}`
  // console.log('connection string: ', connectionString)
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

export default createPool
