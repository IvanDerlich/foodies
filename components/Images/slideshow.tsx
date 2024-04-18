'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import meals from '@/db/init/seedData/index.mjs'
import classes from './slideshow.module.css'

const images = meals.map((meal) => {
  return {
    url: `${process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL}meals/${meal.image_url}`,
    alt: meal.title,
  }
})

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={image.alt}
          src={image.url}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
          width={350}
          height={350}
        />
      ))}
    </div>
  )
}
