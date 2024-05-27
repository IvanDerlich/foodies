import Image from 'next/image'
import { getMeal } from '@/server-actions/database/'
import { notFound } from 'next/navigation'
import DOMPurify from 'isomorphic-dompurify'
import { Metadata } from 'next'
import classes from './page.module.css'
import type { MealDisplay } from '../../../types/meal'

export async function generateMetadata({ params: { mealSlug } }) {
  const meal: MealDisplay = await getMeal(mealSlug)
  if (!meal) {
    notFound()
  }
  const metadata: Metadata = {
    title: `${meal.title} | NextLevel Food by Ivan Derlich`,
    description: meal.summary,
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/meals/${meal.image_url}`,
          width: 800,
          height: 600,
          alt: meal.title,
        },
      ],
      description: meal.summary,
      title: meal.title,
    },
  }
  return metadata
}

async function MealDetails({ params: { mealSlug } }) {
  const meal: MealDisplay = await getMeal(mealSlug)
  if (!meal) {
    notFound()
  }
  meal.instructions = meal.instructions.replace(/\n/g, '<br>')
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            alt={meal.title}
            src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/meals/${meal.image_url}`}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main className="">
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(meal.instructions),
          }}
        />
      </main>
    </>
  )
}

export default MealDetails
