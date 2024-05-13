'use server'

/* eslint-disable import/prefer-default-export */

import { MealUploaded, ShareMealReturnValue } from '@/types/meal'
import { deleteFileFromFTP } from '@/db/shared/index.mjs'
import { DELETION_TIMEOUT_IN_MINUTES } from '@/consts/index'
import {
  uploadMealImageToFTP,
  deleteMealFromDatabase,
  insertMealDataToDatabase,
} from './database'

export async function saveMeal(
  meal: MealUploaded
): Promise<ShareMealReturnValue> {
  try {
    const response: ShareMealReturnValue = await uploadMealImageToFTP(meal)
    console.log('--------------- response: ', response)
    if (response.status !== 'success') {
      throw new Error(response.message)
    }

    const imageName = `${meal.slug}.${meal.imageExtension}`
    const resourceURI = `meals/${imageName}`
    // console.log('------- resourceURI: ', resourceURI)

    console.log('------- Uploading meal data to database...')

    const message = await insertMealDataToDatabase(meal, imageName)

    // Delete image on FTP Server if the meal data was not saved in the database
    if (message.rowCount === 0) {
      deleteFileFromFTP(resourceURI)
      throw new Error(
        'Error saving meal. Meal image could be saved but not the meal data. Deleteting image from cloud storage.'
      )
    }

    // 20 minutes timeout
    setTimeout(
      async () => {
        // Delete the image blob from the cloud storage
        deleteFileFromFTP(resourceURI)
        // Delete the meal data from the database
        deleteMealFromDatabase(meal.slug)
      },
      DELETION_TIMEOUT_IN_MINUTES * 60 * 1000
    )

    console.log('------- Responding success to the client...')
    return {
      status: 'success',
      message: `Meal Saved successfully. It will be deleted in ${DELETION_TIMEOUT_IN_MINUTES} minutes from our persistent storage because this is a demo.`,
    }
  } catch (error) {
    console.log(
      '--------------- Responding error to the client...',
      error.message
    )
    return {
      status: 'error',
      message: error.message,
    }
  }
}
