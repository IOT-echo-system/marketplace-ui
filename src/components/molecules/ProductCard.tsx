import type {ProductDetails} from '../templates/products/Product'
import {AddToCartButton, Price} from '../atoms'
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  type CardProps,
  Divider,
  Stack,
  styled,
  Typography
} from '@mui/material'
import {apiConfig} from '../../config/apiConfig'
import React from 'react'
import {FavoriteBorder} from '@mui/icons-material'
import {useRouter} from 'next/router'

const CardContainer = styled(Card)<CardProps>(({theme}) => ({
  boxShadow: theme.shadows[0],
  justifyContent: 'space-between',
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(0.5),
  border: `1px solid ${theme.palette.grey[400]}`,
  cursor: 'pointer',
  width: 'calc(25% - 8px)',
  [theme.breakpoints.down('xl')]: {
    width: 'calc(33.33% - 8px)'
  },
  [theme.breakpoints.down('lg')]: {
    width: 'calc(50% - 8px)'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
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
        <ButtonGroup fullWidth variant={'contained'}>
          <AddToCartButton productId={attributes.productId} />
          <Divider orientation={'vertical'} />
          <Button startIcon={<FavoriteBorder />} variant={'contained'} title={'Add to wishlist'} sx={{width: '25%'}} />
        </ButtonGroup>
      </CardActions>
    </CardContainer>
  )
}
