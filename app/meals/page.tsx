import React from 'react'
import Link from 'next/link'
import MealsGrid from '@/components/MealsGrid'
import classes from './page.module.css'
import { getMeals } from '@/dbaccess/meals'

async function MealsPage() {
  const meals = await getMeals()
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
        <MealsGrid meals={meals} />
      </main>
    </>
  )
}

export default MealsPage
