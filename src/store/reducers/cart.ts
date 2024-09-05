import type {TRootActions} from '../../typing/store'
import type {AddressType} from './address'
import type {Order} from '../../services/typing/userService'

export const CartAction = {
  ADD_ITEM_INTO_CART: 'ADD_ITEM_INTO_CART',
  UPDATE_QTY_INTO_CART: 'UPDATE_QTY_INTO_CART',
  REMOVE_PRODUCT_FROM_CART: 'REMOVE_PRODUCT_FROM_CART',
  REMOVE_ALL_PRODUCT_FROM_CART: 'REMOVE_ALL_PRODUCT_FROM_CART',
  ADD_BILLING_ADDRESS: 'ADD_BILLING_ADDRESS',
  ADD_SHIPPING_ADDRESS: 'ADD_SHIPPING_ADDRESS',
  CLEAR_CART: 'CLEAR_CART',
  UPDATE_SHIPPING_CHARGE: 'UPDATE_SHIPPING_CHARGE',
  UPDATE_ORDER_TYPE: 'UPDATE_ORDER_TYPE',
  UPDATE_DISCOUNT: 'UPDATE_DISCOUNT'
} as const

export type CartStateType = {
  productIds: Array<{productId: string; qty: number}>
  billingAddress: AddressType | null
  shippingAddress: AddressType | null
  shippingCharge: number
  discountCoupon: {discount: number; code: string} | null
  type: Order['type']
}

export const initCartState: CartStateType = {
  productIds: [],
  billingAddress: null,
  shippingAddress: null,
  shippingCharge: 0,
  discountCoupon: null,
  type: 'ONLINE'
}
const getQty = (qty: number) => (qty >= 0 ? qty : 0)

const cartReducer = (state: CartStateType, action: TRootActions): CartStateType => {
  switch (action.type) {
    case CartAction.ADD_ITEM_INTO_CART: {
      const {productId, qty} = action.payload
      const cartItem = state.productIds.find(item => item.productId === productId)
      if (!cartItem) {
        return {...state, productIds: [...state.productIds, {productId, qty}]}
      }
      const cart = state.productIds.map(item => {
        return item.productId === productId ? {...item, qty: getQty(item.qty + qty)} : item
      })
      return {...state, productIds: cart}
    }
    case CartAction.UPDATE_QTY_INTO_CART: {
      const {productId, qty} = action.payload
      const cart = state.productIds.map(item => (item.productId === productId ? {...item, qty: getQty(qty)} : item))
      return {...state, productIds: cart}
    }
    case CartAction.REMOVE_PRODUCT_FROM_CART: {
      const cart = state.productIds.filter(item => item.productId !== action.payload.productId)
      return {...state, productIds: cart}
    }
    case CartAction.REMOVE_ALL_PRODUCT_FROM_CART: {
      return {...state, productIds: []}
    }
    case CartAction.ADD_BILLING_ADDRESS: {
      return {...state, billingAddress: action.payload.address}
    }
    case CartAction.ADD_SHIPPING_ADDRESS: {
      return {...state, shippingAddress: action.payload.address, type: 'ONLINE'}
    }
    case CartAction.UPDATE_SHIPPING_CHARGE: {
      return {...state, shippingCharge: action.payload.shippingCharge}
    }
    case CartAction.CLEAR_CART: {
      return {...initCartState}
    }
    case CartAction.UPDATE_ORDER_TYPE: {
      const type = action.payload.type
      return {...state, type, shippingAddress: type === 'ONLINE' ? state.shippingAddress : null}
    }
    case CartAction.UPDATE_DISCOUNT: {
      return {...state, discountCoupon: action.payload.coupon}
    }
    default:
      return state
  }
}

export default cartReducer
