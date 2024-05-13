'use server'

import { openConnection } from './openConnection.mjs'

// eslint-disable-next-line import/prefer-default-export
export async function uploadFileToFTPFromFileSystem(path, remotePath) {
  const connection = await openConnection()
  const response = await connection.uploadFrom(path, remotePath)
  connection.close()
  return response
}
