import { Readable } from 'stream'

/* eslint-disable import/prefer-default-export */
export async function blobToReadable(blob: Blob): Promise<Readable> {
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return Readable.from([buffer])
}
