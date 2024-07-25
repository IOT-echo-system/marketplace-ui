import type {AddressType, OrderProduct, User} from '../reducers'
import {SellerAction} from '../reducers/seller'

export const setUserInSeller = (user: User) => {
  return {type: SellerAction.SET_SELLER, payload: {user}}
}

export const addItemInSellerCart = (orderProduct: OrderProduct) => {
  return {type: SellerAction.ADD_ITEM_IN_SELLER_CART, payload: {orderProduct}}
}

export const setGstBillInSellerCart = (gstBill: boolean) => {
  return {type: SellerAction.SET_GST_BILL_IN_SELLER_CART, payload: {gstBill}}
}

export const setDiscountInSellerCart = (discount: number) => {
  return {type: SellerAction.SET_DISCOUNT_IN_SELLER_CART, payload: {discount}}
}

export const addAddressInSellerCart = (address: AddressType) => {
  return {type: SellerAction.ADD_ADDRESS_IN_SELLER_CART, payload: {address}}
}
