'use client'

import { Suspense } from 'react'
import Link from 'next/link'

import Meals from '@/components/MealsGrid'
import type { Metadata } from 'next'
import classes from './page.module.css'

export const metadata: Metadata = {
  title: 'All Meals',
  description:
    'Meals shared by a food-loving community. Created by Ivan Derlich following a tutorial by Maximillian Schwarzmüller.',
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
          <Link href="/meals/pre-share">Share Your Favorite Recipe</Link>
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
