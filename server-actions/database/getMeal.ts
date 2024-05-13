'use server'

/* eslint-disable import/prefer-default-export */

import { MealDisplay } from '@/types/meal'
import { createPool } from '@/db/shared/createPool.mjs'

export async function getMeal(slug) {
  const pool = await createPool('verceldb')
  try {
    console.log('Accessing db to get one meal:')
    const result = await pool.query(
      'SELECT * FROM foodies.meals WHERE slug = $1',
      [slug]
    )
    return result.rows[0] as MealDisplay
  } catch (err) {
    console.error('Error executing getMeal query', err)
    throw err
  } finally {
    pool.end().catch((error) => {
      console.error('Error ending the getMeal pool ->', error)
      throw error
    })
  }
}
