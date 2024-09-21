import React, {useState} from 'react'
import {FormControlLabel, Radio, RadioGroup, Stack} from '@mui/material'
import {useDispatch, useSelector, useToast} from '../../../hooks'
import {formatPrice} from '../../../utils/utils'
import {Button} from '../../atoms'
import type {ProductDetails} from '../products/Product'
import {UserService} from '../../../services'
import type {PaymentResponse} from '../../../services/typing/userService'
import {clearCart} from '../../../store/actions'
import {Config} from '../../../config'
import theme from '../../../theme/theme'
import type {SiteStateType, User} from '../../../store/reducers'
import type {PaymentMode} from '../../../store/reducers/seller'

declare let window: Window & {Razorpay: new (arg: OptionsType) => {open: () => void}}

type PaymentOptionsPropsType = {onSuccess: (status: boolean) => void; products: ProductDetails[]}

type OptionsType = {
  image: string
  handler: (response: Record<string, unknown>) => Promise<void>
  amount: number
  prefill: {contact: number | null; name: string; email: string}
  name: string
  description: string
  currency: 'INR'
  theme: {color: string}
  order_id: string
  key: string
}

type CreateOptionsType = (
  payment: PaymentResponse,
  site: SiteStateType,
  paymentHandler: (response: Record<string, unknown>) => Promise<void>,
  user: User
) => OptionsType

const createOptions: CreateOptionsType = (payment, site, paymentHandler, user) => ({
  key: Config.RAZORPAY_KEY_ID,
  amount: payment.amount,
  currency: payment.currency,
  name: site.siteInfo.title,
  description: `Transaction for order no ${payment.receipt.replace('payment-', '')}`,
  image: '/favicon.ico',
  // eslint-disable-next-line camelcase
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
})

export const PaymentOptions: React.FC<PaymentOptionsPropsType> = ({products, onSuccess}) => {
  const {cart, user, site} = useSelector(state => state)
  const [mode, setMode] = useState<PaymentMode>('RAZORPAY')
  const toast = useToast()
  const dispatch = useDispatch()

  const paymentHandler = async function (response: Record<string, unknown>) {
    const paymentResponse = await UserService.verifyPayment(response)
    onSuccess(paymentResponse.status === 'success')
  }

  const price = cart.productIds.reduce((count, {qty, productId}) => {
    const price = (products.find(product => product.productId === productId)?.price ?? 0) * qty
    return count + price
  }, 0)

  const discount = (price * (cart.discountCoupon?.discount ?? 0)) / 100
  const priceWithGST = (price - discount) * 1.18
  const totalPrice = priceWithGST + cart.shippingCharge

  const handleCreateOrder = () => {
    UserService.placeOrder(cart, mode)
      .then(({payment}) => {
        dispatch(clearCart())
        if (mode === 'RAZORPAY') {
          const options = createOptions(payment, site, paymentHandler, {
            ...user,
            phone: user.phone ?? cart.billingAddress?.mobileNo ?? NaN
          })
          const rzp = new window.Razorpay(options)
          rzp.open()
        } else {
          onSuccess(true)
        }
      })
      .catch(toast.error)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value as PaymentMode)
  }

  return (
    <Stack justifyContent={'space-around'} spacing={2}>
      <Stack>Amount {formatPrice(totalPrice)}</Stack>
      <RadioGroup value={mode} onChange={handleChange}>
        <FormControlLabel
          value={'RAZORPAY'}
          control={<Radio style={{alignSelf: 'start'}} />}
          label={'Credit Card/Debit Card/UPI/Net banking (Razorpay)'}
        />
        {cart.type !== 'ONLINE' && (
          <FormControlLabel value={'CASH'} control={<Radio style={{alignSelf: 'start'}} />} label={'Cash'} />
        )}
      </RadioGroup>
      <Stack direction={'row'}>
        <Button variant={'contained'} color={'warning'} onClick={handleCreateOrder}>
          Pay now
        </Button>
      </Stack>
    </Stack>
  )
}
