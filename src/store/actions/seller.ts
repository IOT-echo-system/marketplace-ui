import type {AddressType, User} from '../reducers'
import type {OrderProduct, PaymentMode, Seller} from '../reducers/seller'
import {SellerAction} from '../reducers/seller'
import type {Coupon} from '../../services/typing/userService'

export const setUserInSeller = (user: User) => {
  return {type: SellerAction.SET_USER_IN_SELLER, payload: {user}}
}

export const setCartInSeller = (cart: Seller['cart']) => {
  return {type: SellerAction.SET_CART_IN_SELLER, payload: {cart}}
}

export const addItemInSellerCart = (orderProduct: OrderProduct) => {
  return {type: SellerAction.ADD_ITEM_IN_SELLER_CART, payload: {orderProduct}}
}

export const setGstBillInSellerCart = (gstBill: boolean) => {
  return {type: SellerAction.SET_GST_BILL_IN_SELLER_CART, payload: {gstBill}}
}

export const setDiscountInSellerCart = (discount: Coupon) => {
  return {type: SellerAction.SET_DISCOUNT_IN_SELLER_CART, payload: {discount}}
}

export const addAddressInSellerCart = (address: AddressType) => {
  return {type: SellerAction.ADD_ADDRESS_IN_SELLER_CART, payload: {address}}
}

export const updatePaymentModeInSellerCart = (paymentMode: PaymentMode) => {
  return {type: SellerAction.UPDATE_PAYMENT_MODE_IN_SELLER_CART, payload: {paymentMode}}
}
