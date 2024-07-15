import React, {useEffect, useState} from 'react'
import {BoxedContainer} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import type {AccordionType} from '../../molecules'
import {DynamicAccordionList} from '../../molecules'
import {useSelector} from '../../../hooks'
import {AccountDetails} from './AccountDetails'
import {AddressDetails} from './AddressDetails'
import {OrderDetails} from './OrderDetails'
import {PaymentOptions} from './PaymentOptions'
import type {ProductDetails} from '../products/Product'
import {CMSService} from '../../../services'

export type CheckoutStatePropsType = {onSuccess: () => void}

export const Checkout: React.FC = () => {
  const {user} = useSelector(state1 => state1)
  const [state, setState] = useState(user.username ? 1 : 0)
  const {productIds} = useSelector(state => state.cart)
  const [products, setProducts] = useState<ProductDetails[]>([])

  useEffect(() => {
    setState(user.username ? 1 : 0)
  }, [user])

  const handleStateChange = (newState: number) => () => {
    setState(newState)
  }

  const handleChange = (index: number) => {
    setState(index)
  }

  useEffect(() => {
    CMSService.getCartProducts(productIds.map(item => item.productId))
      .then(setProducts)
      .catch()
  }, [productIds])

  const accordionList: AccordionType[] = [
    {
      header: <Typography>Account details {user.username ? `(${user.name})` : ''}</Typography>,
      disabled: !!user.username,
      content: <AccountDetails onSuccess={handleStateChange(1)} />
    },
    {
      header: <Typography>Shipping address</Typography>,
      disabled: state < 1,
      content: <AddressDetails type={'shipping'} onSuccess={handleStateChange(2)} />
    },
    {
      header: <Typography>Billing address</Typography>,
      disabled: state < 2,
      content: <AddressDetails type={'billing'} onSuccess={handleStateChange(3)} />
    },
    {
      header: <Typography>Order summary</Typography>,
      disabled: state < 3,
      content: <OrderDetails onSuccess={handleStateChange(4)} products={products} />
    },
    {
      header: <Typography>Payment options</Typography>,
      disabled: state < 4,
      content: <PaymentOptions products={products} />
    }
  ]

  return (
    <BoxedContainer pt={2} pb={2}>
      <Stack bgcolor={'background.paper'} p={2} spacing={2}>
        <Typography variant={'h5'} component={'h1'}>
          Checkout
        </Typography>
        <DynamicAccordionList accordions={accordionList} expandAccordion={state} onChange={handleChange} />
      </Stack>
    </BoxedContainer>
  )
}
