'use server'

import { put, del } from '@vercel/blob'
import { UploadedImage } from '@/types/meal'

export default async function saveImage(image: UploadedImage) {
  const { url } = await put(`foodies/meals/${image.name}`, image.blob, {
    access: 'public',
  })
  return url
}

// delete image from cloud storage
export async function deleteImage(url: string) {
  await del(url)
}

export async function detectOrphanedImages() {
  // detect images that are not linked to any meal
}

export async function detectStorageSizeExcess() {
  // detect storage has exceeded a certain threshold
}

export async function sendEmailToAdmin() {
  // send email to admin to check for inapropiate content
}

/*
  to-do: Create a function that detects if the cloud storage size is above 
  a certain threshold and deletes the oldest images and orphaned images to free up to 20% of
  space bellow the threshold. 20% is a configurable value.
*/
