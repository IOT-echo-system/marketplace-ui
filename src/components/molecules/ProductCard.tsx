import type {ProductDetails} from '../templates/products/Product'
import {Button, Price} from '../atoms'
import {
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  type CardProps,
  Stack,
  styled,
  Typography
} from '@mui/material'
import {apiConfig} from '../../config/apiConfig'
import React from 'react'
import {FavoriteBorder, ShoppingCart} from '@mui/icons-material'
import {useRouter} from 'next/router'

const CardContainer = styled(Card)<CardProps>(({theme}) => ({
  boxShadow: theme.shadows[0],
  justifyContent: 'space-between',
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(0.5),
  cursor: 'pointer',
  width: 'calc(25% - 8px)',
  [theme.breakpoints.down('xl')]: {
    width: 'calc(33.33% - 8px)'
  },
  [theme.breakpoints.down('lg')]: {
    width: 'calc(50% - 8px)'
  },
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 8px)',
    boxShadow: theme.shadows[2]
  },
  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}))

export const ProductCard: React.FC<ProductDetails> = attributes => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/products/${attributes.slug}`).catch()
  }
  return (
    <CardContainer onClick={handleClick}>
      <Stack>
        <CardMedia
          component="img"
          alt={attributes.featuredImage?.altText ?? ''}
          height={240}
          image={apiConfig.assets + (attributes.featuredImage?.link ?? '')}
        />
        <CardContent>
          <Typography className={'four-line-truncate'} gutterBottom variant="subtitle1" component="div">
            {attributes.title}
          </Typography>
          <Price price={attributes.price} mrp={attributes.price * 1.18} size={'small'} />
        </CardContent>
      </Stack>
      <CardActions>
        <ButtonGroup
          fullWidth
          size={'small'}
          variant={'contained'}
          sx={{'& button': {borderRadius: 0, zIndex: 1}, borderRadius: 1, zIndex: 2, overflow: 'hidden'}}
        >
          <Button size={'small'} sx={{padding: 0}} startIcon={<ShoppingCart />} variant={'contained'} fullWidth>
            Add to cart
          </Button>
          <Button
            size={'small'}
            startIcon={<FavoriteBorder />}
            variant={'contained'}
            title={'Add to wishlist'}
            sx={{width: '25%'}}
          />
        </ButtonGroup>
      </CardActions>
    </CardContainer>
  )
}
