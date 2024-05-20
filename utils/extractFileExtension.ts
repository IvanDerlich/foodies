/* eslint-disable import/prefer-default-export */
export function extractImageExtension(filename) {
  // List of allowed image extensions
  const imageExtensions = ['png', 'jpeg', 'jpg']

  // Check if the filename ends with a period or has no extension
  if (filename.endsWith('.') || !filename.includes('.')) {
    throw new Error('Error: No valid extension found')
  }

  // Extract the extension and convert it to lowercase for comparison
  const extension = filename.split('.').pop().toLowerCase()

  // Check if the extension is in the list of allowed image extensions
  if (imageExtensions.includes(extension)) {
    return extension
  }
  throw new Error('Error: Invalid image extension')
}
