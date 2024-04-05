import createPool from '../shared/createPool.mjs'

/* 
  Connects to the default database to be able to delete and create a new one.
  You can't delete the databa you are connected to.
*/
const adminPool = createPool('postgres')

const targetDatabase = 'verceldb' // The name of the database you want to create

async function recreateDatabase() {
  let success = false
  try {
    // This command will drop the database if it exists, no need to check its existence
    await adminPool.query(`DROP DATABASE IF EXISTS ${targetDatabase}`)
    console.log(`Database ${targetDatabase} has been dropped if it existed.`)

    // Now create a fresh new database
    await adminPool.query(`CREATE DATABASE ${targetDatabase}`)
    success = true
    console.log(`Database ${targetDatabase} has been created.`)
  } catch (error) {
    console.error('Error during the database recreation process:', error.stack)
    success = false
  } finally {
    // Close the pool to clean up resources
    await adminPool.end()
  }
  return success ? 0 : 1
}

export default recreateDatabase
