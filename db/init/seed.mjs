import dummyMeals from './seedData.mjs'

import createPool from '../shared/createPool.mjs'

const userPool = createPool('verceldb')

// SQL query to create the 'meals' table
const createTableQuery = `
   CREATE TABLE IF NOT EXISTS meals (
       id SERIAL PRIMARY KEY,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
   )
`
async function seed() {
  try {
    // Execute the query to create the 'meals' table
    await userPool.query(createTableQuery)
    console.log('Table "meals" has been created or already exists.')

    // Insert the meals data using map to create a promise for each insert operation
    const insertPromises = dummyMeals.map((meal) => {
      const insertMealQuery = `
        INSERT INTO meals (
           slug,
           title,
           image,
           summary,
           instructions,
           creator,
           creator_email
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO NOTHING;
      `
      return userPool.query(insertMealQuery, [
        meal.slug,
        meal.title,
        meal.image,
        meal.summary,
        meal.instructions,
        meal.creator,
        meal.creator_email,
      ])
    })

    // Await all insert promises using Promise.all
    await Promise.all(insertPromises)
    console.log('All meals have been inserted successfully.')
  } catch (error) {
    // Handle any errors that occurred during the table creation or data insertion
    console.error('Error during database seeding:', error)
    throw error // Optional: Rethrow the error if you want calling functions to handle it
  } finally {
    // Ensure that the pool is closed regardless of whether the operation was successful or not
    try {
      await userPool.end()
      console.log('Database pool has been closed.')
    } catch (error) {
      console.error('Error closing the database pool:', error)
    }
  }
}

export default seed
