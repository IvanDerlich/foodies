import React from 'react'
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

export default MealsGrid
