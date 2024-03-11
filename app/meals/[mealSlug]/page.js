import React from 'react'

function MealDetals({params: {mealSlug}, searchParams}) {
  console.log('searchParams: ', searchParams)
  return (
    <div>MealDetals: {mealSlug}</div>
  )
}

export default MealDetals