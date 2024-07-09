import React from 'react'
import {Divider, Stack, styled, Typography} from '@mui/material'
import {useMedia, useSelector} from '../../hooks'
import {MenuItem} from '../atoms'
import * as icons from '@mui/icons-material'
import type {SvgIconComponent} from '@mui/icons-material'
import Link from 'next/link'

const Container = styled(Stack)(({theme}) => ({
  borderTop: `1px solid ${theme.palette.background.default}`,
  background: theme.palette.common.white
}))

const MenuContainer = styled(Stack)(({theme}) => ({
  padding: theme.spacing(2, 2),
  [theme.breakpoints.down('md')]: {
    borderTop: `1px solid ${theme.palette.background.default}`
  }
}))

export const Footer: React.FC = () => {
  const {sections, copyrights, social} = useSelector(state => state.site.footer)
  const media = useMedia()

  return (
    <Container spacing={media.md ? 0 : 4} p={media.md ? 0 : 4}>
      <Stack direction={media.md ? 'column' : 'row'} justifyContent={'space-evenly'}>
        {sections.map(({title, navLinks}, index) => {
          return (
            <MenuContainer spacing={1} key={`${title}-${index}`}>
              <Typography variant={'body1'}>
                <strong>{title}</strong>
              </Typography>
              <Stack spacing={2} pl={2}>
                {navLinks.map(({link, label, newTab}, index) => (
                  <MenuItem key={`${link}-${index}`} link={link} label={label} newTab={newTab} />
                ))}
              </Stack>
            </MenuContainer>
          )
        })}
      </Stack>
      {media.md && <Divider />}
      {social.socials.length > 0 && (
        <Stack m={1} spacing={1}>
          <Stack direction={'row'} justifyContent={'center'}>
            <Typography>
              <strong>{social.title}</strong>
            </Typography>
          </Stack>
          <Stack direction={'row'} justifyContent={'center'} spacing={1}>
            {social.socials.map(({link, icon, name}, index) => {
              const Icon = icons[icon as keyof typeof icons] as SvgIconComponent | undefined
              if (!Icon) {
                return <></>
              }
              return (
                <Link href={link} key={`${link}-${index}`} aria-label={name}>
                  <Icon fontSize={'medium'} />
                </Link>
              )
            })}
          </Stack>
        </Stack>
      )}
      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} m={1}>
        <Typography variant={'body2'}>{copyrights}</Typography>
      </Stack>
    </Container>
  )
}
