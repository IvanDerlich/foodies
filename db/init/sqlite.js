/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const fs = require('fs')
const sql = require('better-sqlite3')
const { dummyMeals } = require('./seedData.mjs')

// Path to the database file
const dbPath = 'meals.db'

// Check if the database file exists and delete it if it does
if (fs.existsSync(dbPath)) {
  // eslint-disable-next-line no-console
  console.log('Database file exists. Deleting the file...')
  fs.unlinkSync(dbPath)
}

// Initialize the database connection
console.log('Creating a new database file...')
const db = sql(dbPath)

// Create the 'meals' table
db.prepare(
  `
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`
).run()

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `)

  dummyMeals.forEach((meal) => {
    stmt.run(meal)
  })
}

initData()
