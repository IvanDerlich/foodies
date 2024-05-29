'use server'

import { MealUploaded, ShareMealReturnValue } from '@/types/meal'
import slugify from 'slugify'
import xss from 'xss'
import { extractImageExtension } from '@/utils/'
import { validateTitle } from '@/utils/validateTitle'
import { saveMeal } from '.'

function isValidText(text: string): boolean {
  return text && text.trim() !== ''
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export default async function shareMeal(
  formData: FormData
): Promise<ShareMealReturnValue> {
  try {
    const title = formData.get('title') as string
    const imageBlob = formData.get('image-blob') as Blob
    const imageExtension = extractImageExtension(
      formData.get('image-name') as string
    )

    console.log('------- Checking if title is valid...')
    validateTitle(title)

    const meal: MealUploaded = {
      title,
      summary: formData.get('summary') as string,
      instructions: xss(formData.get('instructions') as string),
      creator: formData.get('name') as string,
      creator_email: formData.get('email') as string,
      imageFile: imageBlob,
      imageExtension,
      slug: slugify(title || '', { lower: true }),
    }

    if (
      !(
        isValidText(meal.title) &&
        isValidText(meal.summary) &&
        isValidText(meal.instructions) &&
        isValidText(meal.creator) &&
        isValidText(meal.creator_email) &&
        isValidText(meal.slug) &&
        isValidText(meal.imageExtension) &&
        meal.imageFile &&
        meal.imageFile.size > 0 &&
        validateEmail(meal.creator_email)
      )
    ) {
      // console.log('------- One or more fields are invalid...')
    }

    const response = await saveMeal(meal)

    return response
  } catch (error) {
    return { status: 'error', message: error.message }
  }
}
