'use server'

// eslint-disable-next-line import/prefer-default-export
export async function fileNameList(connection, directory) {
  const result = await connection
    .list(directory)
    .then((fileList) => fileList.map((file) => file.name))
    .catch((err) => {
      throw new Error('Failed to list the files in FTP server: ', err)
    })
  return result
}
