import { toast } from 'react-toastify'
import shareMeal from '@/server-actions/shareMeal'
import { DELETION_TIMEOUT_IN_MINUTES } from '@/consts/index'

/* eslint-disable import/prefer-default-export */
const updateToast = (toastId, type, message) => {
  toast.update(toastId, {
    type,
    render: message,
    isLoading: false,
    autoClose: 5000,
    closeOnClick: true,
  })
}

export const onload = async (reader, formData, toastId) => {
  const imageArrayBuffer = reader.result as ArrayBuffer

  const blob = new Blob([new Uint8Array(imageArrayBuffer as ArrayBuffer)], {
    type: 'image/jpeg',
  })

  const image = formData.get('image') as File
  const fileName = image.name

  console.log("fileName from client's filesystem: ", fileName)

  // Add the blob to the formData
  formData.append('image-blob', blob)

  formData.delete('image')

  // Add image name
  formData.append('image-name', fileName)

  const serverResponse = await shareMeal(formData)

  console.log('serverResponse: ', serverResponse)

  if (serverResponse.status === 'success') {
    updateToast(toastId, 'success', serverResponse.message)
    // Redirect to the home page with a warning dialog
    setTimeout(() => {
      // eslint-disable-next-line no-alert
      alert(
        `
        1. Meal Saved succesfully.
        2. Meal will be deleted in ${DELETION_TIMEOUT_IN_MINUTES} minutes from our persistent storage.
        3. This is a demo app.
        4. You will be redirected to the meals page were you can see the meal you created.
        `
      )
      window.location.href = '/meals'
    }, 5000)
  } else {
    updateToast(
      toastId,
      'error',
      `Sharing meal failed. Server Message: ${serverResponse.message}`
    )
  }
}
