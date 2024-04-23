import Link from 'next/link'
import Image from 'next/image'

import classes from './styles.module.css'

export default function MealItem({ title, slug, imageURL, summary, creator }) {
  const imageURI = `${process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL}meals/${imageURL}`
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={imageURI} alt={title} width={370} height={240} />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  )
}
