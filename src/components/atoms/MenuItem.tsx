import Link from 'next/link'
import React from 'react'

type MenuItemPropsType = {label: string; link: string; newTab: boolean}

export const MenuItem: React.FC<MenuItemPropsType> = ({label, link, newTab}) => {
  return (
    <Link href={link} target={newTab ? '_blank' : '_self'}>
      {label}
    </Link>
  )
}
