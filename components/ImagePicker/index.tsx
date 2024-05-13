import { useRef } from 'react'
import Image from 'next/image'
import classes from './classes.module.css'

export default function ImagePicker({
  label,
  name,
  pickedImage,
  setPickedImage,
}) {
  const imageInputRef = useRef<HTMLInputElement>(null)
  function handlePickClick() {
    imageInputRef.current!.click()
  }

  function handlePickChange(event) {
    const file = event.target.files[0]
    setPickedImage(null)
    if (!file) return
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      setPickedImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image src={pickedImage} alt="Preview" fill />
          ) : (
            <div>No image picked yet</div>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg, image/jpg"
          name={name}
          ref={imageInputRef}
          onChange={handlePickChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  )
}
