import React from 'react'
import {Link} from './StyledComponents'

export type MenuItemPropsType = {label: string; link: string; underline?: 'true' | 'false'}

export const MenuItem: React.FC<MenuItemPropsType> = ({label, link, underline}) => {
  return (
    <Link href={link} underline={underline}>
      {label}
    </Link>
  )
}
