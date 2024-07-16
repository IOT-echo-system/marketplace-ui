import {CartAction} from '../reducers/cart'
import type {AddressType} from '../reducers/address'

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
