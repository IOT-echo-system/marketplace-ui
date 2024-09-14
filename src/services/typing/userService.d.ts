import type {AddressType, User} from '../../store/reducers'
import type {OrderProduct, PaymentMode,} from '../../store/reducers/seller'
import type {MetaResponseType} from './CMSService'

export type ServerError = { error?: { status: number; name: string; message?: string } }
export type Order = {
  id: number
  state: 'ORDER_NOT_PLACED' | 'PLACED' | 'DELIVERED'
  type: 'STORE_PICKUP' | 'ONLINE' | 'SELLER'
  amount: number
  billingAddress: AddressType
  shipping?: { address: AddressType, charge: number }
  products: OrderProduct[]
  createdAt: string
  discountCoupon?: Coupon
  shippingCharge: number
  qty: number,
  payment: { id: number, status: 'CREATED' | 'SUCCESS', mode: PaymentMode, collectedAmount?: number }
}

export type SellerOrder = Order

export type UserResponse = { jwt: string; user: User }
export type MeResponse = { addresses: AddressType[] } & User
export type OrderResponse = { data: { id: number; attributes: Order } }
export type OrdersResponse = { results: Order[] } & MetaResponseType
export type OrderWithPayment = { order: Order, payment: PaymentResponse }

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

export type Coupon = { code: string; discount: number, amount?: number }
