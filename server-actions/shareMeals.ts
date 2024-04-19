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
    // console.log('shareMeal')
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
    // console.log('sharemeal2')
    const message = await saveMeal(meal)

    // console.log('sharemeal3')

    let stringifyMessage
    try {
      // console.log('message: ', message)
      stringifyMessage = JSON.stringify({
        rowCount: message.rowCount,
        databaseConnectionString: message.pool.options.connectionString,
        imageURL: message.imageURL,
        meal: message.meal,
      })
    } catch (error) {
      stringifyMessage = 'Error stringifying message'
    }

    console.log('stringifyMessage: ', stringifyMessage)
    const serverResponse: ShareMealReturnValue = {
      status: 'success',
      message: 'Meal shared successfully',
      messageObject: stringifyMessage,
    }
    console.log('serverResponse: ', serverResponse)

    return serverResponse
  } catch (error) {
    return { status: 'error', message: `Sharing meal failed. Error: ${error}` }
  }
}
