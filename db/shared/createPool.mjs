import pg from 'pg'

const { Pool } = pg

const createPool = (database) => {
  const connectionString = `${process.env.CONNECTION_STRING_URL}/${database}?${process.env.CONNECTION_STRING_SETTINGS}`
  return new Pool({
    connectionString,
  })
}

export default createPool
