import React from 'react'
import classes from './styles.module.css'
import MealItem from '../Item'

function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  )
}

export default MealsGrid
