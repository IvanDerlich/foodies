import pg from 'pg'

const { Pool } = pg

const createPool = (database) => {
  const connectionString = `${process.env.CONNECTION_STRING_BEGINING}/${database}?${process.env.CONNECTION_STRING_ENDING}`
  console.log('Connection String: ', connectionString)
  return new Pool({
    connectionString,
  })
}

export default createPool
