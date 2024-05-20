import {
  uploadFileToFTPFromFileSystem,
  deleteFileFromFTP,
} from '../shared/ftpBlob/index.mjs'

export default async function insertMeal(pool, meal) {
  // upload the meal image blob to the ftp server
  const responseFTPServer = await uploadFileToFTPFromFileSystem(
    `./db/init/seedData/${meal.image_url}`,
    `/meals/${meal.image_url}`
  )

  // console.log(
  //   'imageURI: ',
  //   `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/meals/${meal.image_url}`
  // )

  // If unsuccessful, return early
  if (responseFTPServer.code !== 226) {
    return 1
  }

  const insertMealQuery = `
        INSERT INTO foodies.meals (
           slug,
           title,
           image_url,
           summary,
           instructions,
           creator,
           creator_email
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO NOTHING;
      `

  const values = [
    meal.slug,
    meal.title,
    meal.image_url,
    meal.summary,
    meal.instructions,
    meal.creator,
    meal.creator_email,
  ]

  // // return pool.query(insertMealQuery, values)
  const responseDatabase = await pool.query(insertMealQuery, values)

  // if unsuccessful, delete the uploaded file and return early
  if (!responseDatabase.rowCount) {
    await deleteFileFromFTP(`/meals/${meal.image_url}`)
    return 1
  }

  return responseDatabase
}
