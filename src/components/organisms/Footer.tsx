import type {PropsWithChildren} from 'react'
import React from 'react'
import {Divider, Fab, Stack, styled, Typography, useScrollTrigger, Zoom} from '@mui/material'
import {useMedia, useScroll, useSelector} from '../../hooks'
import {MenuItem} from '../atoms'
import type {SvgIconComponent} from '@mui/icons-material'
import * as icons from '@mui/icons-material'
import {KeyboardArrowUp} from '@mui/icons-material'
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

const Scroll = styled('div')(({theme}) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2)
}))

const ScrollTop: React.FC<PropsWithChildren> = ({children}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: typeof window !== 'undefined' ? window : undefined
  })
  const {scroll} = useScroll()
  const handleScroll = () => {
    scroll()
  }

  return (
    <Zoom in={trigger}>
      <Scroll onClick={handleScroll} role="presentation">
        {children}
      </Scroll>
    </Zoom>
  )
}

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
                {navLinks.map(({link, name}, index) => (
                  <MenuItem key={`${link}-${index}`} link={link} label={name} />
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
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Container>
  )
}
