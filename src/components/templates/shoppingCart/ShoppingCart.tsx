import React, {useEffect, useState} from 'react'
import {BoxedContainer, Button, Loader} from '../../atoms'
import {Divider, Stack, Typography} from '@mui/material'
import {useDispatch, useMedia, useSelector} from '../../../hooks'
import {CMSService} from '../../../services'
import type {ProductDetails} from '../products/Product'
import {CartFooter, CartProduct} from '../../molecules'
import {removeAllProductsFromCart} from '../../../store/actions/cart'
import '../../../utils/extenstions'

export const ShoppingCart: React.FC = () => {
  const media = useMedia()
  const dispatch = useDispatch()
  const {productIds} = useSelector(state => state.cart)
  const [products, setProducts] = useState<ProductDetails[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    CMSService.getCartProducts(productIds.map(item => item.productId))
      .then(setProducts)
      .catch()
      .finally(() => {
        setLoading(false)
      })
  }, [productIds])

  const handleClearCart = () => {
    dispatch(removeAllProductsFromCart())
  }

  return (
    <BoxedContainer pt={2} pb={2}>
      <Stack bgcolor={'background.paper'} p={media.sm ? 1 : 2} spacing={media.sm ? 1 : 2}>
        <Stack
          direction={'row'}
          spacing={media.sm ? 1 : 2}
          flexWrap={'wrap'}
          justifyContent={media.sm ? 'space-between' : 'flex-start'}
        >
          <Typography variant={media.sm ? 'subtitle1' : 'h5'} component={'h1'}>
            Shopping cart
          </Typography>
          <Button variant={'outlined'} color={'error'} size={'small'} onClick={handleClearCart}>
            Remove all
          </Button>
        </Stack>
        <Divider />
        {loading ? (
          <Loader text={'Loading...'} height={200} />
        ) : (
          <Stack spacing={media.sm ? 1 : 2}>
            <Stack>
              {products.map(product => (
                <CartProduct key={product.productId} product={product} />
              ))}
            </Stack>
            <CartFooter type={'cart'} products={products} />
          </Stack>
        )}
      </Stack>
    </BoxedContainer>
  )
}
