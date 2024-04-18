import createPool from '../shared/createPool.mjs'

/* 
  Connects to the default database to be able to delete and create a new one.
  You can't delete the databa you are connected to.
*/

console.log('connecting to database to be able to delete schema if exists')
const adminPool = await createPool('verceldb')

async function recreateSchema() {
  let success = false
  const schemaName = 'foodies'
  try {
    await adminPool.query(`DO $$ 
    BEGIN
      IF EXISTS (SELECT schema_name
                FROM information_schema.schemata
                WHERE schema_name = '${schemaName}') 
      THEN
        EXECUTE 'DROP SCHEMA ${schemaName} CASCADE';
      END IF;
    END $$;
    `)
    console.log('Schema foodies has been dropped if it existed.')

    await adminPool.query(`CREATE SCHEMA ${schemaName}`)

    console.log(`Schema ${schemaName} has been created.`)
    success = true
  } catch (error) {
    console.error('Error during the schema recreation process:', error.stack)
    success = false
  } finally {
    // Close the pool to clean up resources
    console.log('Closing the admin pool.')
    adminPool.end()
  }
  return success ? 0 : 1
}

export default recreateSchema
