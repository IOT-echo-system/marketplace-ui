import React from 'react'
import {Link} from './StyledComponents'
import type {CTAPropsType} from './CTAButton'

export type MenuItemPropsType = CTAPropsType & {underline?: 'true' | 'false'}

export const MenuItem: React.FC<MenuItemPropsType> = ({label, link, underline}) => {
  return (
    <Link href={link} underline={underline}>
      {label}
    </Link>
  )
}
