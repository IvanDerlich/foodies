'use server'

/* eslint-disable import/prefer-default-export */
import type { MealDisplay } from '@/types/meal'
import { createPool } from '@/db/shared/index.mjs'

export async function getMeals() {
  const pool = await createPool('verceldb')
  try {
    console.log('Accessing db to get all meals:')
    const result = await pool.query('SELECT * FROM foodies.meals')
    return result.rows as MealDisplay[]
  } catch (err) {
    console.error('Error executing getMeals query', err)
    throw err
  } finally {
    pool.end().catch((error) => {
      console.error('Error ending the getMeals pool ->', error)
      throw error
    })
  }
}
