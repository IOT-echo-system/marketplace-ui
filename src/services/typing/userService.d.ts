import type {AddressType, OrderProduct, User} from '../../store/reducers'

export type ServerError = {error: {status: number; name: string; message: string}}
export type Order = {
  id: number
  state: string
  amount: number
  billingAddress: AddressType
  shippingAddress: AddressType
  products: OrderProduct[]
  createdAt: string
  discountCoupon: Coupon
  shippingCharge: number
}

export type UserResponse = {jwt: string; user: User}
export type AddressResponse = {data: {id: number; attributes: AddressType}}
export type OrderResponse = {data: {id: number; attributes: Order}}
export type PaymentResponse = {
  amount: number
  amount_due: number
  amount_paid: number
  attempts: number
  created_at: number
  currency: 'INR'
  entity: 'order'
  id: string
  receipt: string
  status: 'created' | 'success'
}

export type Coupon = {code: string; discount: number}
