'use server'

/* eslint-disable import/prefer-default-export */

import { openConnection, fileNameList } from './index.mjs'

export async function deleteAllFilesFromFTP(folder) {
  const connection = await openConnection()
  let fileList = await fileNameList(connection, folder)
  const filesToExcludeFromDeletion = ['seed']
  fileList = fileList.filter(
    (file) => !filesToExcludeFromDeletion.includes(file)
  )
  console.log('---- Files for deletion:', fileList)
  if (Array.isArray(fileList) && fileList.length > 0) {
    for (let i = 0; i < fileList.length; i += 1) {
      const file = fileList[i]
      console.log('---- Deleting this file: ', `/${folder}/${file}`)
      // eslint-disable-next-line no-await-in-loop
      await connection.remove(`/${folder}/${file}`)
    }
  }
  connection.close()
}
