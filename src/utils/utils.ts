import moment from 'moment'
import type {CartStateType} from '../store/reducers'
import type {ProductDetails} from '../components/templates/products/Product'
import type {OrderProduct} from '../store/reducers/seller'

export const formatDate = (date: Date | string, format?: string): string => {
  return moment(date)
    .local()
    .format(format ?? 'MMM DD, YYYY')
}

export const formatPrice = (number: number, decimalPoints = 2): string => {
  const numberStr = Math.abs(number).toFixed(decimalPoints).toString()
  const [integerPart, fractionalPart] = numberStr.split('.')
  let lastThreeDigits = integerPart.slice(-3)
  const otherDigits = integerPart.slice(0, -3)
  if (otherDigits !== '') {
    lastThreeDigits = ',' + lastThreeDigits
  }
  const indianFormattedNumber = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThreeDigits
  if (fractionalPart) {
    return `₹${number < 0 ? '-' : ''}${indianFormattedNumber}.${fractionalPart}`
  }
  return `₹${number < 0 ? '-' : ''}${indianFormattedNumber}`
}

export const calculateTotalQtyAndPrice = (
  cart: CartStateType,
  products: ProductDetails[]
): {
  qty: number
  price: number
} => {
  return cart.productIds.reduce(
    (count, {qty, productId}) => {
      const price = (products.find(product => product.productId === productId)?.price ?? 0) * qty
      return {qty: count.qty + qty, price: count.price + price}
    },
    {price: 0, qty: 0}
  )
}

export const calculateTotalQtyAndPriceFromOrder = (products: OrderProduct[]): {qty: number; price: number} => {
  return products.reduce(
    (count, {qty, price}) => {
      const totalPrice = qty * price
      return {qty: count.qty + qty, price: totalPrice + count.price}
    },
    {price: 0, qty: 0}
  )
}
