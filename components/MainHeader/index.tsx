import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import styles from './classes.module.css'
import Background from './background'
import NavLink from './navlink'

function MainHeader() {
  return (
    <header className={styles.header}>
      <Background />
      <Link className={styles.logo} href="/">
        <Image src={logo} alt="Home Logo" priority />
        Next Level Food
      </Link>
      <nav className={styles.nav}>
        <NavLink href="/meals">Meals</NavLink>
        <NavLink href="/community">Community</NavLink>
      </nav>
    </header>
  )
}

export default MainHeader
