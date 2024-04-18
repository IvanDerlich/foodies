import seed from './seed.mjs'

import recreateSchema from './recreateSchema.mjs'

// Now use this function to recreate the database and then initialize it
await recreateSchema()

// Seed the recently created database with some initial data
await seed()
