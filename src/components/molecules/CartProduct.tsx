import type {ProductDetails} from '../templates/products/Product'
import type {StackProps, TextFieldProps} from '@mui/material'
import {CardMedia, Stack, styled, TextField, Typography} from '@mui/material'
import {apiConfig} from '../../config/apiConfig'
import React from 'react'
import {useDispatch, useMedia, useSelector} from '../../hooks'
import {removeProductFromCart, updateProductQtyToCart} from '../../store/actions/cart'
import {ButtonLink} from '../atoms'
import {formatNumber} from '../../utils/utils'

const CardContainer = styled(Stack)<StackProps>(({theme}) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1)
  }
}))

const StyledTextField = styled(TextField)<TextFieldProps>(({theme}) => ({
  width: theme.spacing(6),
  padding: 0,
  '& *': {
    padding: 0,
    textAlign: 'center'
  }
}))

type CartProductPropsType = {product: ProductDetails}
export const CartProduct: React.FC<CartProductPropsType> = ({product}) => {
  const dispatch = useDispatch()
  const media = useMedia()
  const {productIds} = useSelector(state => state.cart)
  const qty = productIds.find(item => item.productId === product.productId)?.qty ?? 0

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (!isNaN(value) && value >= 0) {
      dispatch(updateProductQtyToCart(product.productId, value))
    }
  }

  const handleRemove = () => {
    dispatch(removeProductFromCart(product.productId))
  }

  return (
    <CardContainer direction={'row'} alignItems={'center'}>
      <Stack direction={media.sm ? 'column' : 'row'} spacing={2} width={media.tablet ? '100%' : '80%'}>
        <Stack width={media.sm ? '100%' : '20%'}>
          <CardMedia
            component="img"
            alt={product.featuredImage?.altText ?? product.title}
            height={120}
            image={apiConfig.assets + (product.featuredImage?.link ?? '')}
          />
        </Stack>
        <Stack width={media.sm ? '100%' : '80%'} justifyContent={'center'}>
          <Typography
            className={'four-line-truncate'}
            gutterBottom
            variant={media.tablet ? 'subtitle2' : 'subtitle1'}
            component="h2"
          >
            {product.title}
          </Typography>
          {media.tablet && (
            <Typography variant={media.sm ? 'subtitle2' : 'subtitle1'} component={'div'}>
              ₹{formatNumber(product.price)}
            </Typography>
          )}
          <Stack direction={'row'} spacing={media.sm ? 2 : 8} flexWrap={'wrap'} alignItems={'baseline'}>
            <Stack direction={'row'} spacing={1} alignItems={'baseline'} flexWrap={'wrap'}>
              <Typography variant={media.sm ? 'subtitle2' : 'subtitle1'}>Qty.</Typography>
              <StyledTextField
                size={'small'}
                value={qty}
                type={'number'}
                variant={'standard'}
                onChange={handleChange}
              />
            </Stack>
            <ButtonLink onClick={handleRemove}>Remove</ButtonLink>
          </Stack>
        </Stack>
      </Stack>
      {!media.tablet && (
        <Typography variant={'subtitle1'} component={'div'}>
          ₹{formatNumber(product.price)}
        </Typography>
      )}
    </CardContainer>
  )
}
