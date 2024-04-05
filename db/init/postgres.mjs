import seed from './seed.mjs'

import recreateDatabase from './recreateDb.mjs'

// Now use this function to recreate the database and then initialize it
await recreateDatabase()

// Seed the recently created database with some initial data
seed()
