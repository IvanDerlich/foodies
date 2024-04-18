'use server'

import { MealUploaded } from '@/types/meal'
import slugify from 'slugify'
import xss from 'xss'
import { saveMeal } from './database'

type ShareMealReturnValue = {
  status: 'success' | 'error'
  message: string
}

export default async function shareMeal(
  formData: FormData
): Promise<ShareMealReturnValue> {
  try {
    const title = formData.get('title') as string

    // Sanitize and Arrange the meal data
    const meal: MealUploaded = {
      title,
      summary: formData.get('summary') as string,
      instructions: xss(formData.get('instructions') as string),
      creator: formData.get('name') as string,
      creator_email: formData.get('email') as string,
      image: {
        name: formData.get('image-name') as string,
        blob: formData.get('image-blob') as File,
      },
      slug: slugify(title, { lower: true }),
    }

    const message = await saveMeal(meal)
      .then(() => {
        console.log('Meal saved successfully')
      })
      .catch((error) => {
        console.error('Error saving meal', error)
        throw error
      })
    return {
      status: 'success',
      message: `Meal shared successfully. Server message:${message}`,
    }
  } catch (error) {
    return { status: 'error', message: 'Sharing meal failed' }
  }
}
