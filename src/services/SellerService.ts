import WebClient from 'web-client-starter'
import {apiConfig} from '../config/apiConfig'
import type {AddressType} from '../store/reducers'
import type {AddressResponse} from './typing/sellerService'
import type {OnlineOrderResponse, Order} from './typing/userService'
import type {Seller} from '../store/reducers/seller'

class SellerService_ {
  config = apiConfig.seller
  baseUrl = apiConfig.baseUrl + this.config.baseUrl

  async getAddress(mobileNo: number): Promise<AddressType> {
    const response = await WebClient.get<AddressResponse>({
      baseUrl: apiConfig.baseUrl,
      path: this.config.findAddress,
      uriVariables: {mobileNo}
    })
    if (response.data.isEmpty()) {
      throw new Error('Data not found!!')
    }
    return response.data.map(({id, attributes}) => ({id, ...attributes}))[0]
  }

  getOrders(data: Record<string, unknown>) {
    return WebClient.post<OnlineOrderResponse>({
      baseUrl: this.baseUrl,
      path: this.config.ordersFilter,
      body: {data}
    })
  }

  getOrder(orderId: string) {
    return WebClient.get<Order>({
      baseUrl: this.baseUrl,
      path: this.config.order,
      uriVariables: {orderId}
    })
  }

  markAsDelivered(orderId: number) {
    return WebClient.put<Order>({
      baseUrl: this.baseUrl,
      path: this.config.order,
      uriVariables: {orderId},
      body: {state: 'DELIVERED'}
    })
  }

  addOrder(cartData: Seller['cart']) {
    return WebClient.post({
      baseUrl: this.baseUrl,
      path: this.config.orders,
      body: cartData
    })
  }
}

export const SellerService = new SellerService_()
