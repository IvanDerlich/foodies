'use server'

export default async function shareMeal(formData) {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })
  try {
    console.log('formData in server: ', formData)
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
    }
    console.log('meal: ', meal)
    return { status: 'success', message: 'Meal shared successfully' }
  } catch (error) {
    return { status: 'error', message: 'Sharing meal failed' }
  }
}
