import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import styles from './classes.module.css'
import Background from './background'

function MainHeader() {
  return (
    <header className={styles.header}>
      <Background />
      <Link className={styles.logo} href="/">
        <Image src={logo} alt="Home Logo" priority />
        Next Level Food
      </Link>
      <nav className={styles.nav}>
        <Link href="/meals">Browse Meals</Link>
        <Link href="/community">Community</Link>
      </nav>
    </header>
  )
}

export default MainHeader
