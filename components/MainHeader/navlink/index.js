'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from '../classes.module.css'

function NavLink({ href, children }) {
  const path = usePathname()
  const isActive = path.startsWith(href) ? styles.active : ''

  return (
    <Link href={href} className={isActive}>
      {children}
    </Link>
  )
}

export default NavLink
