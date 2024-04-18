'use server'

/* 
  Input parameters of these functions have to be sanitized and arranged 
  to be used in this file
*/

import { MealUploaded } from '@/types/meal'
import saveImage from './vercelBlob'

import createPool from '../db/shared/createPool.mjs'

const pool = createPool('verceldb')

export async function getMeals() {
  try {
    console.log('Accessing db to get all meals:')
    const result = await pool.query('SELECT * FROM foodies.meals')
    return result.rows
  } catch (err) {
    console.error('Error executing getMeals query', err)
    throw err
  }
}

export async function getMeal(slug) {
  try {
    console.log('Accessing db to get one meal:')
    const result = await pool.query(
      'SELECT * FROM foodies.meals WHERE slug = $1',
      [slug]
    )
    return result.rows[0]
  } catch (err) {
    console.error('Error executing getMeal query', err)
    throw err
  }
}

export async function saveMeal(meal: MealUploaded) {
  const url = await saveImage(meal.image)
  const storageURLLength = process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL.length
  const resourceURL = url.slice(storageURLLength + 'meals/'.length)
  const message = await pool.query(
    'INSERT INTO foodies.meals (title, summary, instructions, creator, creator_email, slug, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      meal.title,
      meal.summary,
      meal.instructions,
      meal.creator,
      meal.creator_email,
      meal.slug,
      resourceURL,
    ]
  )

  /*
    to-do: Send email to admin to check for inapropiate content
    Import sendEmailToAdmin from './vercelBlob' for this
  */
  return message
}
