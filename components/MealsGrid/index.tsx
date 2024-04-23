'use client'

import React, { useEffect, useState } from 'react'
import { getMeals } from '@/server-actions/database'
import classes from './styles.module.css'
import MealItem from './Item'
import type { MealDisplay } from '@/types/meal'

function MealsGrid({ meals }) {
  console.log('meals: ', meals)
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
      console.log('meals received:', res)
      setMeals(res)
    })
  }, [])

  console.log('meals: ', meals)
  return meals.length > 0 ? <MealsGrid meals={meals} /> : null
}

export default Meals
