export type UploadedImage = {
  name: string
  blob: File
}

export type MealUploaded = {
  slug: string
  title: string
  creator_email: string
  summary: string
  instructions: string
  creator: string
  image: UploadedImage
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
