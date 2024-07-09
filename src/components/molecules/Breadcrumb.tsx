import React from 'react'
import {Breadcrumbs, Typography} from '@mui/material'
import {NavigateNext} from '@mui/icons-material'
import type {MenuItemPropsType} from '../atoms'
import {MenuItem} from '../atoms'

type BreadcrumbProps = {
  links: MenuItemPropsType[],
  text?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({links, text}) => {
  return <Breadcrumbs separator={<NavigateNext/>}>
    {links.map(link => <MenuItem key={link.link} label={link.label} link={link.link}/>)}
    {text && <Typography>{text}</Typography>}
  </Breadcrumbs>
}
