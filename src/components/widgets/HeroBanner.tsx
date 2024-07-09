import React from 'react'
import type {WidgetPropType} from './widget'
import {Stack, styled, Typography} from '@mui/material'
import type {CTAPropsType, ImageType} from '../atoms'
import {BoxedContainer, CTA} from '../atoms'
import {apiConfig} from '../../config/apiConfig'
import {useMedia} from '../../hooks'

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

type HeroBannerPropsType = {
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
    <Container src={apiConfig.assets + data.image.data?.attributes.formats.large.url}>
      <BoxedContainer>
        <Stack spacing={2} width={media.md ? '100%' : '60%'}>
          <Typography variant={media.md ? 'h3' : 'h1'} component={'h1'} color={data.darkText ? 'black' : 'white'}>
            {data.title}
          </Typography>
          <Typography
            variant={media.md ? 'subtitle1' : 'h4'}
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
