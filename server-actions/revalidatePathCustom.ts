'use server'

/* eslint-disable import/prefer-default-export */

import { revalidatePath } from 'next/cache'

export async function revalidatePathCustom(path: string) {
  revalidatePath(path)
}
