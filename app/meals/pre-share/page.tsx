import React from 'react'
import Link from 'next/link'
import { DELETION_TIMEOUT_IN_MINUTES } from '@/consts/index'
import classes from '../share/page.module.css'

function PreSharePage() {
  return (
    <header className={classes.header}>
      <h1>Considerations before sharing:</h1>
      <ul>
        <li>
          <p>
            {`After uploading your meal, you'll be redirected to the meals page where you'll be able to see your newly created meal from any location in the world.`}
          </p>
        </li>
        <li>
          <p>
            {`This is a demo app so the meal you share will be deleted after ${DELETION_TIMEOUT_IN_MINUTES} minutes from our persistent storage.`}
          </p>
        </li>
      </ul>
      <Link href="share">
        <p className={classes.actions}>
          <button type="button">I understand</button>
        </p>
      </Link>
    </header>
  )
}

export default PreSharePage
