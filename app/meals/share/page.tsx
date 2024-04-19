'use client'

/* eslint-disable jsx-a11y/label-has-associated-control */
import ImagePicker from '@/components/ImagePicker'
import { useState } from 'react'
import { toast } from 'react-toastify'
import shareMeal from '@/server-actions/shareMeals'
import classes from './page.module.css'

export default function ShareMealPage() {
  const [pickedImage, setPickedImage] = useState(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const toastId = toast.loading('Sharing your meal...', {
      closeOnClick: true,
      closeButton: true,
    })

    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const reader = new FileReader()

    reader.onerror = (error) => {
      toast.update(toastId, {
        type: 'error',
        render: `Error reading file from your device. Please try again. No data sent to the server. Error message: ${error}`,
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      })
    }

    reader.onload = async () => {
      const imageArrayBuffer = reader.result

      const blob = new Blob([new Uint8Array(imageArrayBuffer as ArrayBuffer)], {
        type: 'image/jpeg',
      })

      formData.append('image-blob', blob)

      const image = formData.get('image') as File
      const fileName = image.name

      formData.delete('image')
      formData.append('image-name', fileName)

      const serverResponse = await shareMeal(formData)

      console.log('Server response:', serverResponse)

      console.log(
        'Server response message object:',
        JSON.parse(serverResponse.messageObject)
      )

      if (serverResponse.status === 'success') {
        toast.update(toastId, {
          type: 'success',
          render:
            serverResponse.message +
            (serverResponse.messageObject &&
              'Check message object in the console for more info'),
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        })
      } else {
        toast.error(
          `Sharing meal failed. Server Message: ${serverResponse.message}`
        )
      }
    }

    // Fetch image from your device with the pickedImage URL
    fetch(pickedImage)
      // convert the image to a blob
      .then((res) => res.blob())

      // read the blob as an array buffer
      .then((blob) => reader.readAsArrayBuffer(blob))
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            />
          </p>
          <ImagePicker
            label="image"
            name="image"
            pickedImage={pickedImage}
            setPickedImage={setPickedImage}
          />
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  )
}
