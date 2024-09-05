import {useSelector} from '../../../hooks'
import React, {useEffect, useState} from 'react'
import type {ProductDetails} from '../products/Product'
import {CMSService} from '../../../services'
import type {AccordionType} from '../../molecules'
import {Typography} from '@mui/material'
import {AccountDetails} from './AccountDetails'
import {AddressDetails} from './AddressDetails'
import {OrderDetails} from './OrderDetails'
import {PaymentOptions} from './PaymentOptions'
import {OrderTypeDetails} from './OrderTypeDetails'

type OrderStatus = 'DRAFT' | 'SUCCESS' | 'FAIL' | 'ACKNOWLEDGE'
type UseCheckoutReturnType = {
  handleChange: (index: number) => void
  orderStatus: OrderStatus
  state: number
  accordionList: AccordionType[]
  handleClose: () => void
}
export const useCheckout = (): UseCheckoutReturnType => {
  const {user, cart} = useSelector(state => state)
  const [state, setState] = useState(user.username ? 1 : 0)
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('DRAFT')
  const {productIds} = cart
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

  const handleOrderStatus = (status: boolean) => {
    setOrderStatus(status ? 'SUCCESS' : 'FAIL')
    handleChange(-1)
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
      header: <Typography>Order type</Typography>,
      disabled: state < 1,
      content: <OrderTypeDetails onSuccess={handleStateChange(2)} />
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
      content: <PaymentOptions products={products} onSuccess={handleOrderStatus} />
    }
  ]

  return {
    accordionList,
    handleChange,
    orderStatus,
    state,
    handleClose: () => {
      setOrderStatus('ACKNOWLEDGE')
    }
  }
}
