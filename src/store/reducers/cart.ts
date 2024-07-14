import type {TRootActions} from '../../typing/store'
import type {Address} from './address'
import type {ImageType} from '../../components/atoms'
import type {ProductDetails} from '../../components/templates/products/Product'

export const CartAction = {
  ADD_ITEM_INTO_CART: 'ADD_ITEM_INTO_CART',
  UPDATE_QTY_INTO_CART: 'UPDATE_QTY_INTO_CART',
  REMOVE_PRODUCT_FROM_CART: 'REMOVE_PRODUCT_FROM_CART',
  REMOVE_ALL_PRODUCT_FROM_CART: 'REMOVE_ALL_PRODUCT_FROM_CART',
  ADD_BILLING_ADDRESS: 'ADD_BILLING_ADDRESS',
  ADD_SHIPPING_ADDRESS: 'ADD_SHIPPING_ADDRESS',
  ADD_PRODUCTS: 'ADD_PRODUCTS'
} as const

export type OrderProduct = {
  title: string
  slug: string
  qty: number
  price: number
  mrp: number
  productId: string
  featuredImage?: ImageType
}

export type CartStateType = {
  productIds: Array<{productId: string; qty: number}>
  products: OrderProduct[]
  billingAddress: Address | null
  shippingAddress: Address | null
}

export const createOrderProduct = (product: ProductDetails, qty: number): OrderProduct => {
  return {
    featuredImage: product.featuredImage,
    mrp: product.mrp,
    price: product.price,
    productId: product.productId,
    slug: product.slug,
    title: product.title,
    qty
  }
}

export const initCartState: CartStateType = {productIds: [], products: [], billingAddress: null, shippingAddress: null}
const getQty = (qty: number) => (qty >= 0 ? qty : 0)

const cartReducer = (state: CartStateType, action: TRootActions): CartStateType => {
  switch (action.type) {
    case CartAction.ADD_ITEM_INTO_CART: {
      const {productId, qty} = action.payload
      const cartItem = state.productIds.find(item => item.productId === productId)
      if (!cartItem) {
        return {...state, productIds: [...state.productIds, {productId, qty}]}
      }
      const cart = state.productIds.map(item =>
        item.productId === productId
          ? {
            ...item,
            qty: getQty(item.qty + qty)
          }
          : item
      )
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
      return {...state, shippingAddress: action.payload.address}
    }
    case CartAction.ADD_PRODUCTS: {
      return {...state, products: action.payload.products}
    }
    default:
      return state
  }
}

export default cartReducer
