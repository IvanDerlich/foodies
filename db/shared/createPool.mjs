import pg from 'pg'

const { Pool } = pg

const createPool = (database) => {
  return new Pool({
    connectionString: `${process.env.CONNECTION_STRING_BEGINING}/${database}?${process.env.CONNECTION_STRING_ENDING}`,
  })
}

export default createPool
