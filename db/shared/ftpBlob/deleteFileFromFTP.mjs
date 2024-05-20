'use server'

import { openConnection } from './openConnection.mjs'

// eslint-disable-next-line import/prefer-default-export
export async function deleteFileFromFTP(remotePath) {
  const connection = await openConnection()
  console.log('---- File for deletion:', remotePath)
  await connection.remove(remotePath)
  connection.close()
}
