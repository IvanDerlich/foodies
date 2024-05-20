'use client'

import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Error({ error }) {
  return (
    <main className="error">
      <h1>An error ocurred!</h1>
      <p> Failed to fetch meals Data. Please try again later.</p>
    </main>
  )
}

export default Error
