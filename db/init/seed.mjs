import dummyMeals from './seedData/index.mjs'

import createPool from '../shared/createPool.mjs'

console.log('Connecting to verceldb database to seed it.')
const userPool = await createPool('verceldb')

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

async function seed() {
  try {
    console.log('Creating table "meals"')
    // Execute the query to create the 'meals' table
    await userPool.query(createTableQuery)
    console.log('Table "meals" has been created or already exists.')

    // Insert the meals data using map to create a promise for each insert operation
    const insertPromises = dummyMeals.map((meal) => {
      const insertMealQuery = `
        INSERT INTO foodies.meals (
           slug,
           title,
           image_url,
           summary,
           instructions,
           creator,
           creator_email
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO NOTHING;
      `

      // console.log('Inserting meal into "meals": ', meal.slug)
      const values = [
        meal.slug,
        meal.title,
        meal.image_url,
        meal.summary,
        meal.instructions,
        meal.creator,
        meal.creator_email,
      ]
      // console.log('insertMealQuery: ', insertMealQuery)
      // console.log('values: ', values)
      return userPool.query(insertMealQuery, values)
    })

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
