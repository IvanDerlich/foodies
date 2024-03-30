import Image from 'next/image'
import { getMeal } from '@/dbaccess/meals'
import classes from './page.module.css'

type Meal = {
  title: string
  image: string
  creator_email: string
  slug: string
  summary: string
  instructions: string
  creator: string
}

// eslint-disable-next-line no-unused-vars
function MealDetals({ params: { mealSlug } }) {
  const meal: Meal = getMeal(mealSlug)
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
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        />
      </main>
    </>
  )
}

export default MealDetals
