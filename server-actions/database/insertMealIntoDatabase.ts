'use server'

import { createPool } from '@/db/shared/index.mjs'

/* eslint-disable import/prefer-default-export */

export const insertMealDataToDatabase = async (meal, resourceURI) => {
  const pool = await createPool('verceldb')
  const message = await pool.query(
    'INSERT INTO foodies.meals (title, summary, instructions, creator, creator_email, slug, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      meal.title,
      meal.summary,
      meal.instructions,
      meal.creator,
      meal.creator_email,
      meal.slug,
      resourceURI,
    ]
  )
  pool.end()

  return message
}
