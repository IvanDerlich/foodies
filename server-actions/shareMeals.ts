'use server'

import { MealUploaded } from '@/types/meal'
import slugify from 'slugify'
import xss from 'xss'
import { saveMeal } from './database'

type ShareMealReturnValue = {
  status: 'success' | 'error'
  message: string
  messageObject?: string
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
    return {
      status: 'success',
      message: `Meal shared successfully.${message && 'Check message object in the console for more info'}`,
      messageObject: JSON.stringify(message),
    }
  } catch (error) {
    return { status: 'error', message: `Sharing meal failed. Error: ${error}` }
  }
}
