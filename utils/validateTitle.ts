/* eslint-disable import/prefer-default-export */
export function validateTitle(filename: string): void {
  // Check if the filename is empty
  if (!filename) {
    throw new Error('Title is empty')
  }

  // Windows filenames can't be longer than 255 characters
  if (filename.length > 255) {
    throw new Error('Title longer than 255 characters')
  }

  const allowedCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789- _'

  // Check each character in the filename
  for (let i = 0; i < filename.length; i += 1) {
    if (!allowedCharacters.includes(filename[i])) {
      throw new Error(
        `Title contains illegal characters. In this case is: ${filename[i]} and maybe more invalid characters.`
      )
    }
  }

  // Check for Windows reserved names
  const reservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i
  if (reservedRe.test(filename.split('.')[0])) {
    throw new Error('Title is a reserved name')
  }
}
