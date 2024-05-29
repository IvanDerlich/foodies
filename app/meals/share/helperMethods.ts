import { toast } from 'react-toastify'
import shareMeal from '@/server-actions/shareMeal'
// import { revalidatePath } from 'next/cache'
import { revalidatePathCustom } from '@/server-actions'
import { redirect } from 'next/navigation'

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
    // Redirect to the home page after 5 seconds
    setTimeout(() => {
      revalidatePathCustom('meals')
      redirect('/meals')
    }, 5000)
  } else {
    updateToast(
      toastId,
      'error',
      `Sharing meal failed. Server Message: ${serverResponse.message}`
    )
  }
}
