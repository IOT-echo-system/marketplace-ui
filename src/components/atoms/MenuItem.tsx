import Link from 'next/link'
import React from 'react'

export type MenuItemPropsType = {label: string; link: string}

export const MenuItem: React.FC<MenuItemPropsType> = ({label, link}) => {
  return <Link href={link}>{label}</Link>
}
