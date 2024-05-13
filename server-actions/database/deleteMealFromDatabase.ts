'use server'

/* eslint-disable import/prefer-default-export */

import { createPool } from '@/db/shared/index.mjs'

export async function deleteMealFromDatabase(slug) {
  const pool = createPool('verceldb')
  try {
    console.log('Trying to delete meal')
    // const meal = await getMeal(slug)
    const message = await pool.query(
      'DELETE FROM foodies.meals WHERE slug = $1',
      [slug]
    )
    console.log('meal deleted. message rowcount:', message.rowCount)
    if (message.rowCount === 0) {
      throw new Error('Error deleting meal')
    }
    // deleteImage(`${process.env.FTP_URI}meals/${meal.image_url}`)
    return message
  } catch (error) {
    console.error('Error deleting the meal ->', error)
    throw error
  } finally {
    pool.end().catch((error) => {
      console.error('Error ending the deleteMeal pool ->', error)
      throw error
    })
  }
}
