import WebClient from 'web-client-starter'
import {apiConfig} from '../config/apiConfig'
import type {AddressType} from '../store/reducers'
import type {AddressesResponse} from './typing/sellerService'
import type {Order, OrdersResponse, SellerOrder} from './typing/userService'
import type {OrderProduct, PaymentMode, Seller} from '../store/reducers/seller'
import type {ParsedUrlQuery} from 'querystring'

class SellerService_ {
  config = apiConfig.seller
  baseUrl = apiConfig.baseUrl + this.config.baseUrl

  async getAddress(mobileNo: number): Promise<AddressType> {
    const response = await WebClient.get<AddressesResponse>({
      baseUrl: apiConfig.baseUrl,
      path: this.config.findAddress,
      uriVariables: {mobileNo}
    })
    if (response.data.isEmpty()) {
      throw new Error('Data not found!!')
    }
    return response.data.map(({id, attributes}) => ({id, ...attributes}))[0]
  }

  addAddress(address: AddressType): Promise<AddressType> {
    return WebClient.post<AddressType>({
      baseUrl: apiConfig.baseUrl,
      path: this.config.address,
      body: {data: address}
    })
  }

  getOrders(data: Record<string, unknown>) {
    return WebClient.post<OrdersResponse>({
      baseUrl: this.baseUrl,
      path: this.config.ordersFilter,
      body: {data}
    })
  }

  getOrder(orderId: string): Promise<SellerOrder> {
    return WebClient.get<SellerOrder>({
      baseUrl: this.baseUrl,
      path: this.config.order,
      uriVariables: {orderId}
    })
  }

  markAsDelivered(orderId: number): Promise<Order> {
    return WebClient.put<Order>({
      baseUrl: this.baseUrl,
      path: this.config.order,
      uriVariables: {orderId},
      body: {state: 'DELIVERED'}
    })
  }

  collectPaymentAndMarkDelivered(orderId: number, values: {mode: PaymentMode; amount: number}): Promise<Order> {
    return WebClient.put<Order>({
      baseUrl: this.baseUrl,
      path: this.config.payAndDeliver,
      uriVariables: {orderId},
      body: values
    })
  }

  verifyPayment(orderId: number, query: ParsedUrlQuery) {
    return WebClient.put<'SUCCESS' | 'FAILURE'>({
      baseUrl: this.baseUrl,
      path: this.config.verifyPayment,
      uriVariables: {orderId},
      body: query
    })
  }

  updatePaymentStatus(orderId: number): Promise<Order> {
    return WebClient.get<Order>({
      baseUrl: this.baseUrl,
      path: this.config.updatePaymentStatus,
      uriVariables: {orderId}
    })
  }

  createSellerOrder(cart: Seller['cart'], values: {mode: PaymentMode}) {
    return WebClient.post<Order>({
      baseUrl: this.baseUrl,
      path: this.config.orders,
      body: {cart, mode: values.mode}
    })
  }

  getProductsByIdOrName(nameOrId: string) {
    return WebClient.get<OrderProduct[]>({
      baseUrl: this.baseUrl,
      path: this.config.products,
      queryParams: {nameOrId}
    })
  }
}

export const SellerService = new SellerService_()
