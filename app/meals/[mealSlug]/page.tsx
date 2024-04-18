import Image from 'next/image'
import { getMeal } from '@/server-actions/database'
import { notFound } from 'next/navigation'
import DOMPurify from 'isomorphic-dompurify'
import classes from './page.module.css'
import type { MealDisplay } from '../../../types/meal'

async function MealDetals({ params: { mealSlug } }) {
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
            src={`${process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL}meals/${meal.image_url}`}
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

export default MealDetals
