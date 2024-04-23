import { getMeals } from '@/server-actions/database'
import { Suspense } from 'react'
import Link from 'next/link'

import MealsGrid from '@/components/MealsGrid'
import classes from './page.module.css'
import type { MealDisplay } from '../../types/meal'

async function Meals() {
  'use client'

  const meals: MealDisplay[] = await getMeals()
  console.log('meals: ', meals)
  return <MealsGrid meals={meals} />
}

function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, created
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself, it&apos;s easy and
          fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}

export default MealsPage
