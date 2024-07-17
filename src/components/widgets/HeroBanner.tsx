import React from 'react'
import {Stack, styled, Typography} from '@mui/material'
import type {CTAPropsType, ImageType} from '../atoms'
import {BoxedContainer, CTA} from '../atoms'
import {useMedia} from '../../hooks'
import type {WidgetPropType} from '../../services/typing/pageDetails'

const Container = styled(Stack)<{src: string}>(({theme, src}) => ({
  background: src ? `url(${src})` : theme.palette.primary.light,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: theme.spacing(52),
  justifyContent: 'center',
  alignItems: 'center',
  '& h1': {
    fontSize: theme.spacing(8),
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(6)
    }
  }
}))

export type HeroBannerPropsType = {
  cta?: CTAPropsType
  title: string
  subtitle: string
  darkText: boolean
  image: ImageType
  mobileImage?: ImageType
}

export const HeroBanner: React.FC<WidgetPropType<HeroBannerPropsType>> = ({data}) => {
  const media = useMedia()
  return (
    <Container src={(media.md ? data.mobileImage?.link : null) ?? data.image.link}>
      <BoxedContainer>
        <Stack spacing={2} width={{xs: '100%', md: '60%'}}>
          <Typography
            variant={media.md ? 'h3' : 'h2'}
            component={'h1'}
            color={data.darkText ? 'black' : 'white'}
            style={{whiteSpace: 'pre-line'}}
          >
            {data.title}
          </Typography>
          <Typography
            style={{whiteSpace: 'pre-line'}}
            variant={media.md ? 'subtitle1' : 'h5'}
            component={'h2'}
            color={data.darkText ? 'black' : 'white'}
          >
            {data.subtitle}
          </Typography>
          {data.cta && <CTA cta={data.cta} />}
        </Stack>
      </BoxedContainer>
    </Container>
  )
}
