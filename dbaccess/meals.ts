import sql from 'better-sqlite3'

const db = sql('meals.db')

export async function getMeals() {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return db.prepare('SELECT * FROM meals').all()
}

export async function getMeal(id) {
  return db.prepare('SELECT * FROM meals WHERE id = ?').get(id)
}