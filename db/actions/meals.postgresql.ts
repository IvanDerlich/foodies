/* eslint-disable no-console */
import createPool from '../shared/createPool.mjs'

const pool = createPool('verceldb')

export async function getMeals() {
  try {
    // Log the action to the console
    console.log('Accessing db to get all meals:')
    // Use the pool to query the database
    const result = await pool.query('SELECT * FROM meals')
    // Return all rows from the query result
    return result.rows
  } catch (err) {
    // Log and throw the error for the caller to handle
    console.error('Error executing getMeals query', err)
    throw err
  }
}

export async function getMeal(slug) {
  try {
    // Log the action to the console
    console.log('Accessing db to get one meal:')
    // Use the pool to query the database with a parameterized query
    const result = await pool.query('SELECT * FROM meals WHERE slug = $1', [
      slug,
    ])
    // Return the first row from the query result
    return result.rows[0]
  } catch (err) {
    // Log and throw the error for the caller to handle
    console.error('Error executing getMeal query', err)
    throw err
  }
}
