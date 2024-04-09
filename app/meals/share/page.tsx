'use client'

/* eslint-disable jsx-a11y/label-has-associated-control */
import ImagePicker from '@/components/ImagePicker'
import { useState } from 'react'
import { toast } from 'react-toastify'
import shareMeal from '@/server-actions/shareMeals'
import classes from './page.module.css'

export default function ShareMealPage() {
  const [pickedImage, setPickedImage] = useState(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // // Don't delete: Display form data:
    // const formDataObject = Object.fromEntries(formData.entries())
    // console.log('form data:', formDataObject)
    const toastId = toast.loading('Sharing your meal...')
    const returnValue = await shareMeal(formData)

    if (returnValue.status === 'error') {
      toast.update(toastId, {
        type: 'error',
        render: returnValue.message,
        isLoading: false,
        closeButton: true,
        closeOnClick: true,
      })
      return
    }
    toast.update(toastId, {
      type: 'success',
      render: returnValue.message,
      isLoading: false,
      autoClose: 5000,
      closeOnClick: true,
    })

    form.reset()
    setPickedImage(null)
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
        {/* <ToastContainer pauseOnHover draggable position="top-center" /> */}
      </main>
    </>
  )
}
