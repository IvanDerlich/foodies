import { deleteAllFilesFromFTP } from '../shared/ftpBlob/deleteAllFilesFromFTP.mjs'
import seed from './seed.mjs'
import recreateSchema from './recreateSchema.mjs'

// Delete all files from the FTP server
await deleteAllFilesFromFTP('meals')

// Now use this function to recreate the database and then initialize it
await recreateSchema()

// Seed the recently created database with some initial data
await seed()
