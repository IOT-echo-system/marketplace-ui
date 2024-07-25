import type {TRootActions} from '../../typing/store'
import type {User} from './user'
import type {OrderProduct} from './cart'
import type {AddressType} from './address'

export const SellerAction = {
  SET_SELLER: 'SET_SELLER',
  ADD_ITEM_IN_SELLER_CART: 'ADD_ITEM_IN_SELLER_CART',
  SET_GST_BILL_IN_SELLER_CART: 'SET_GST_BILL_IN_SELLER_CART',
  SET_DISCOUNT_IN_SELLER_CART: 'SET_DISCOUNT_IN_SELLER_CART',
  ADD_ADDRESS_IN_SELLER_CART: 'ADD_ADDRESS_IN_SELLER_CART'
} as const

export type Seller = {
  user: User | null
  cart: {
    products: OrderProduct[]
    billingAddress: AddressType | null
    gstBill: boolean
    discount: number
  }
}

export const initSellerState: Seller = {
  user: null,
  cart: {products: [], billingAddress: null, gstBill: false, discount: 5}
}

const getQty = (qty: number) => (qty >= 0 ? qty : 0)

const sellerReducer = (state: Seller, action: TRootActions): Seller => {
  switch (action.type) {
    case SellerAction.SET_SELLER: {
      return {...state, user: action.payload.user}
    }
    case SellerAction.ADD_ITEM_IN_SELLER_CART: {
      const {productId, qty} = action.payload.orderProduct
      const cartItem = state.cart.products.find(item => item.productId === productId)
      if (!cartItem) {
        return {...state, cart: {...state.cart, products: [...state.cart.products, action.payload.orderProduct]}}
      }
      const products = state.cart.products.map(item => {
        return item.productId === productId ? {...action.payload.orderProduct, qty: getQty(qty)} : item
      })
      return {...state, cart: {...state.cart, products}}
    }
    case SellerAction.SET_GST_BILL_IN_SELLER_CART: {
      return {...state, cart: {...state.cart, gstBill: action.payload.gstBill}}
    }
    case SellerAction.SET_DISCOUNT_IN_SELLER_CART: {
      return {...state, cart: {...state.cart, discount: Math.max(0, Math.min(10, action.payload.discount))}}
    }
    case SellerAction.ADD_ADDRESS_IN_SELLER_CART: {
      return {...state, cart: {...state.cart, billingAddress: action.payload.address}}
    }
    default:
      return state
  }
}

export default sellerReducer
