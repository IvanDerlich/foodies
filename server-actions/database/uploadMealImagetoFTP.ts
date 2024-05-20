'use server'

import { uploadToFTPFromBlob } from '.'

/* eslint-disable import/prefer-default-export */
export const uploadMealImageToFTP = async (meal) => {
  const response = await uploadToFTPFromBlob(
    meal.imageFile,
    meal.slug,
    'meals',
    meal.imageExtension
  )
  return response
}
