import React from 'react'
import type {WidgetPropType} from './widget'
import {Button, Card, CardActions, CardContent, CardMedia, Stack, styled, Typography} from '@mui/material'
import type {ImageType} from '../atoms'
import {BoxedContainer} from '../atoms'
import {useMedia} from '../../hooks'
import {apiConfig} from '../../config/apiConfig'

const Container = styled(Stack)(({theme}) => ({
  justifyContent: 'center',
  background: theme.palette.background.default,
  padding: theme.spacing(4, 0),
  alignItems: 'center',
  '& h2': {
    fontSize: theme.spacing(6),
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(4)
    }
  }
}))

type ContentCardsPropsType = {
  heading: string
  cards: Array<{
    title: string
    image: ImageType
    description: string
    ctaText?: string
    ctaLink?: string
  }>
}

const getCardWidth = (numberOfCards: number): string => {
  return `calc(${100 / numberOfCards}% - 32px)`
}

export const ContentCards: React.FC<WidgetPropType<ContentCardsPropsType>> = ({data}) => {
  const media = useMedia()
  const cardWidth = getCardWidth(Math.min(data.cards.length, 4))
  return (
    <Container>
      <BoxedContainer spacing={2}>
        <Typography variant={'h2'}>{data.heading}</Typography>
        <Stack direction={media.md ? 'column' : 'row'} flexWrap={'wrap'}>
          {data.cards.map((card, index) => {
            return (
              <Card
                key={`card_${index}`}
                sx={{margin: 2, minWidth: 320, width: media.md ? 'calc(100% - 32px)' : cardWidth}}
              >
                <CardMedia
                  component="img"
                  alt={card.title}
                  height={media.md ? '180' : '220'}
                  image={apiConfig.assets + card.image.data?.attributes.formats.small.url}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
                {card.ctaLink && card.ctaText && (
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                )}
              </Card>
            )
          })}
        </Stack>
      </BoxedContainer>
    </Container>
  )
}
