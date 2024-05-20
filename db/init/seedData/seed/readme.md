# Considerations

Read [this](https://vercel.com/docs/storage/vercel-blob/client-upload) document to develop a client that uploads the images in this folder to the blob storage.

So each initialization of the database uploads all these images automatically before cleansing the previous images.

If we don't delete the previous pictures the database can grow indefinitelly.

As long as we don't have this we have to do the process manually.
