export type MealUploaded = {
  slug: string
  title: string
  creator_email: string
  summary: string
  instructions: string
  creator: string
  imageFile: Blob
  imageExtension: 'png' | 'jpg' | 'jpeg'
}

export type MealDisplay = {
  slug: string
  title: string
  creator_email: string
  summary: string
  instructions: string
  creator: string
  image_url: string
}

export type ShareMealReturnValue = {
  status: 'success' | 'error'
  message: string
}
