import type {AddressType} from '../reducers'
import {CartAction} from '../reducers'
import type {Coupon, Order} from '../../services/typing/userService'

export const addProductToCart = (productId: string, qty: number) => ({
  type: CartAction.ADD_ITEM_INTO_CART,
  payload: {productId, qty}
})

export const updateProductQtyToCart = (productId: string, qty: number) => ({
  type: CartAction.UPDATE_QTY_INTO_CART,
  payload: {productId, qty}
})

export const removeProductFromCart = (productId: string) => ({
  type: CartAction.REMOVE_PRODUCT_FROM_CART,
  payload: {productId}
})

export const removeAllProductsFromCart = () => ({type: CartAction.REMOVE_ALL_PRODUCT_FROM_CART})

export const addBillingAddress = (address: AddressType) => ({type: CartAction.ADD_BILLING_ADDRESS, payload: {address}})

export const addShippingAddress = (address: AddressType) => ({
  type: CartAction.ADD_SHIPPING_ADDRESS,
  payload: {address}
})

export const clearCart = () => ({type: CartAction.CLEAR_CART})

export const updateShippingPrice = (shippingCharge: number) => ({
  type: CartAction.UPDATE_SHIPPING_CHARGE,
  payload: {shippingCharge}
})

export const updateOrderType = (type: Order['type']) => ({type: CartAction.UPDATE_ORDER_TYPE, payload: {type}})

export const updateDiscount = (coupon: Coupon) => ({
  type: CartAction.UPDATE_DISCOUNT,
  payload: {coupon}
})
