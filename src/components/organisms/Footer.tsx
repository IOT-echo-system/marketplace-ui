import type {PropsWithChildren} from 'react'
import React from 'react'
import {Fab, Stack, styled, Typography, useScrollTrigger, Zoom} from '@mui/material'
import {useScroll, useSelector} from '../../hooks'
import type {SvgIconComponent} from '@mui/icons-material'
import * as icons from '@mui/icons-material'
import {KeyboardArrowUp} from '@mui/icons-material'
import {BoxedContainer, Link} from '../atoms'
import type {AccordionType} from '../molecules'
import {AccordionList} from '../molecules'

const Container = styled(Stack)(({theme}) => ({
  borderTop: `1px solid ${theme.palette.background.default}`,
  background: theme.palette.background.paper
}))

const MenuContainer = styled(Stack)(({theme}) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    borderTop: `1px solid ${theme.palette.divider}`
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
  const {sections, copyright, socials} = useSelector(state => state.site.footer)

  const accordionList: AccordionType[] = sections.map(({title, ctas}, index) => {
    return {
      expanded: index === 0,
      header: <Typography fontWeight={'bold'}>{title}</Typography>,
      content: (
        <Stack spacing={2} pb={2} pl={4}>
          {ctas.map(({link, label}, index) => {
            return (
              <Link sx={{color: 'inherit'}} key={`${link}-${index}`} href={link}>
                {label}
              </Link>
            )
          })}
        </Stack>
      )
    }
  })

  return (
    <Container alignItems={'center'} spacing={{xs: 2, md: 4}} p={{xs: 0, md: 2}}>
      <Stack sx={{display: {xs: 'flex', md: 'none'}}} m={0} width={'100%'}>
        <AccordionList disableBorder accordions={accordionList} />
      </Stack>
      <BoxedContainer sx={{display: {md: 'flex', xs: 'none'}}} direction={'row'} justifyContent={'space-evenly'}>
        {sections.map(({title, ctas}, index) => {
          return (
            <MenuContainer spacing={1} key={`${title}-${index}`}>
              <Typography variant={'body1'}>
                <strong>{title}</strong>
              </Typography>
              <Stack spacing={2} pl={2}>
                {ctas.map(({link, label}, index) => (
                  <Link sx={{color: 'inherit'}} key={`${link}-${index}`} href={link}>
                    {label}
                  </Link>
                ))}
              </Stack>
            </MenuContainer>
          )
        })}
      </BoxedContainer>

      <Stack m={1} spacing={1} sx={{display: socials.isEmpty() ? 'none' : 'flex'}}>
        <Stack direction={'row'} justifyContent={'center'}>
          <Typography>
            <strong>Connect with us</strong>
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'center'} spacing={2} flexWrap={'wrap'}>
          {socials.map(({icon, cta}, index) => {
            const Icon = icons[icon as keyof typeof icons] as SvgIconComponent | undefined
            if (!Icon) {
              return <></>
            }
            return (
              <Link href={cta.link} key={`cta-${index}`} sx={{color: 'inherit'}}>
                <Icon fontSize={'medium'} />
              </Link>
            )
          })}
        </Stack>
      </Stack>

      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} pb={1}>
        <Typography variant={'body2'}>{copyright}</Typography>
      </Stack>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Container>
  )
}
