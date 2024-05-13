'use client'

import React, { useEffect, useState } from 'react'
import { getMeals } from '@/server-actions/database/'
import type { MealDisplay } from '@/types/meal'
import classes from './styles.module.css'
import MealItem from './Item'

function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem
            title={meal.title}
            slug={meal.slug}
            imageURL={meal.image_url}
            summary={meal.summary}
            creator={meal.creator}
          />
        </li>
      ))}
    </ul>
  )
}

function Meals() {
  const [meals, setMeals] = useState<MealDisplay[]>([])

  useEffect(() => {
    getMeals().then((res) => {
      setMeals(res)
    })
  }, [])

  return meals.length > 0 ? <MealsGrid meals={meals} /> : null
}

export default Meals
