'use server'

import { fileNameList, openConnection } from '@/db/shared/index.mjs'
import { ShareMealReturnValue } from '@/types/meal'
import { blobToReadable } from '@/utils/blobToReadable'

// eslint-disable-next-line import/prefer-default-export
export async function uploadToFTPFromBlob(
  blob: Blob,
  filename: string,
  remoteDirectoryPath: string,
  fileExtension: string
): Promise<ShareMealReturnValue> {
  if (!blob) {
    throw new Error('No blob provided')
  }
  if (!filename) {
    throw new Error('No filename provided')
  }
  if (!remoteDirectoryPath) {
    throw new Error('No remoteDirectoryPath provided')
  }
  if (!fileExtension) {
    throw new Error('No fileExtension provided')
  }

  const remoteFilePath = `${remoteDirectoryPath}/${filename}.${fileExtension}`

  const connectionPromise = openConnection()
  const readableArrayPromise = blobToReadable(blob)
  console.log('------- Initating transfer of image to FTP server...')

  let connectionDuplicate
  // Wait for both promises to resolve
  return Promise.all([connectionPromise, readableArrayPromise])
    .then(async ([connection, readableArray]) => {
      // Check if file exists in the ftp server and if it does throw error
      connectionDuplicate = connection
      console.log('------- Retrieving file name list from FTP server...')
      const files = await fileNameList(connection, remoteDirectoryPath)
      // console.log('fileName: ', `${filename}.${fileExtension}`)
      // console.log('files: ', files)

      if (files.includes(`${filename}.${fileExtension}`)) {
        console.log('------ File name already exist in the FTP server')
        throw new Error('File name already exist in the FTP server')
      } else {
        console.log('------ Uploading image to FTP server...')
        await connection.uploadFrom(readableArray, remoteFilePath)
        const returnValue: ShareMealReturnValue = {
          status: 'success',
          message: 'Image uploaded successfully',
        }
        return returnValue
      }
    })
    .catch((error) => {
      const returValue: ShareMealReturnValue = {
        status: 'error',
        message: error.message as string,
      }
      return returValue
    })
    .finally(() => {
      connectionDuplicate.close()
    })
}
