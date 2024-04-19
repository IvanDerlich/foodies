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
  try {
    const url = await saveImage(meal.image)
    const storageURLLength = process.env.CLOUD_STORAGE_URL.length
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
    const mealFromDatabase = await getMeal(meal.slug)

    console.log('mealFromDatabase:', mealFromDatabase)

    if (message.rowCount === 0) {
      // deleteImage(url)
      throw new Error('Error saving meal')
    }
    /* 
      Set an event in 10 minutes to:
        - Delete the blob from the cloud storage
        - Delete the meal from the database
    */
    setTimeout(async () => {
      console.log('Testing timeout')
      // deleteImage(`${process.env.CLOUD_STORAGE_URL}meals/${resourceURL}`)
    }, 10000)
    message.imageUrl = url
    message.meal = mealFromDatabase

    return message
  } catch (error) {
    console.error('Error saving the meal ->', error)
    throw error
  }
}
