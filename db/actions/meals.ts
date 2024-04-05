import sql from 'better-sqlite3'

const db = sql('meals.db')

export function getMeals() {
  // eslint-disable-next-line no-console
  console.log('accessing db to get all meals: ')
  return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug) {
  // eslint-disable-next-line no-console
  console.log('accessing db to get one meal: ')
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}
