import dummyMeals from './seedData/index.mjs'

import { createPool } from '../shared/index.mjs'
import insertMeal from './instertMeal.mjs'

async function seed() {
  const userPool = await createPool('verceldb')
  console.log('Connecting to verceldb database to seed it.')

  // SQL query to create the 'meals' table
  const createTableQuery = `
   CREATE TABLE IF NOT EXISTS foodies.meals (
       id SERIAL PRIMARY KEY,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image_url TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
   )
`
  try {
    console.log('Creating table "meals"')
    // Execute the query to create the 'meals' table
    await userPool.query(createTableQuery)
    console.log('Table "meals" has been created or already exists.')

    // Insert the meals data using map to create a promise for each insert operation
    const insertPromises = dummyMeals.map((meal) => insertMeal(userPool, meal))

    await Promise.all(insertPromises)
    console.log('Meals data has been inserted into the "meals" table.')
  } catch (error) {
    // Handle any errors that occurred during the table creation or data insertion
    console.error('Error during database seeding:', error)
    throw error // Optional: Rethrow the error if you want calling functions to handle it
  } finally {
    userPool.end()
    console.log('Pool has been closed.')
  }
}

export default seed
