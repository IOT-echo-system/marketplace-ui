import React from 'react'
import {Stack} from '@mui/material'
import {useDispatch, useMedia, useSelector, useToast} from '../../../hooks'
import {formatPrice} from '../../../utils/utils'
import {Button} from '../../atoms'
import type {ProductDetails} from '../products/Product'
import {UserService} from '../../../services'
import type {ServerError} from '../../../services/typing/authService'
import {clearCart} from '../../../store/actions/cart'
import {Config} from '../../../config'
import theme from '../../../theme/theme'

type PaymentOptionsPropsType = {onSuccess: (status: boolean) => void; products: ProductDetails[]}
export const PaymentOptions: React.FC<PaymentOptionsPropsType> = ({products, onSuccess}) => {
  const media = useMedia()
  const {cart, user, site} = useSelector(state => state)
  const toast = useToast()
  const dispatch = useDispatch()

  const paymentHandler = async function (response: Record<string, unknown>) {
    const paymentResponse = await UserService.verifyPayment(response)
    onSuccess(paymentResponse.status === 'success')
  }

  const price = cart.productIds.reduce((count, {qty, productId}) => {
    const price = products.find(product => product.productId === productId)?.price ?? 0
    return count + qty * price
  }, 0)

  const handleCreateOrder = () => {
    UserService.placeOrder(cart)
      .then(payment => {
        dispatch(clearCart())
        const options = {
          key: Config.RAZORPAY_KEY_ID,
          amount: payment.amount,
          currency: payment.currency,
          name: site.siteInfo.title,
          description: `Transaction for order no ${payment.receipt.replace('payment-', '')}`,
          image: 'https://example.com/your_logo',
          order_id: payment.id,
          handler: paymentHandler,
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone
          },
          theme: {
            color: theme.palette.primary.main
          }
        }
        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      })
      .catch((error: ServerError) => {
        toast.error(error.error.message)
      })
  }

  return (
    <Stack justifyContent={'space-around'} spacing={media.md ? 2 : 4}>
      <Stack>Amount {formatPrice(price)}</Stack>
      <Stack direction={'row'}>
        <Button variant={'contained'} color={'warning'} onClick={handleCreateOrder}>
          Pay now
        </Button>
      </Stack>
    </Stack>
  )
}
