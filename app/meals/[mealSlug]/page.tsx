import Image from 'next/image'
import { getMeal } from '@/dbaccess/meals'
import classes from './page.module.css'
import type { Meal } from '../types/meal'

async function MealDetals({ params: { mealSlug } }) {
  console.log('Accessing database with this mealSlug: ', mealSlug)
  const meal: Meal = await getMeal(mealSlug)
  meal.instructions = meal.instructions.replace(/\n/g, '<br>')
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image alt={meal.title} src={meal.image} fill />
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
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        >
          {meal.instructions}
        </p>
      </main>
    </>
  )
}

export default MealDetals
