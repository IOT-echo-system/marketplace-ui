import React from 'react'
import {Button} from '@mui/material'
import {ShoppingCart} from '@mui/icons-material'
import {addProductToCart} from '../../store/actions/cart'
import {useDispatch, useSelector} from '../../hooks'
import {useRouter} from 'next/router'
import {Config} from '../../config'

type AddToCartButtonPropsType = {productId: string}
export const AddToCartButton: React.FC<AddToCartButtonPropsType> = ({productId}) => {
  const {productIds} = useSelector(state => state.cart)

  const router = useRouter()
  const dispatch = useDispatch()

  const addItemInCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    dispatch(addProductToCart(productId, 1))
  }

  const goToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    router.push(Config.CART_PAGE_PATH).catch()
  }

  const isAlreadyInCart = productIds.some(item => item.productId === productId)

  return (
    <Button
      sx={{textTransform: 'inherit'}}
      startIcon={<ShoppingCart />}
      variant={'contained'}
      color={isAlreadyInCart ? 'warning' : 'primary'}
      fullWidth
      onClick={isAlreadyInCart ? goToCart : addItemInCart}
    >
      {isAlreadyInCart ? 'Go' : 'Add'} to cart
    </Button>
  )
}
