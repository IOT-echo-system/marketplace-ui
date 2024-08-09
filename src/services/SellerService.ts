import WebClient from 'web-client-starter'
import {apiConfig} from '../config/apiConfig'
import type {AddressType} from '../store/reducers'
import type {AddressResponse} from './typing/sellerService'
import type {OnlineOrderResponse, Order} from './typing/userService'

class SellerService_ {
  config = apiConfig.seller
  baseUrl = apiConfig.baseUrl + this.config.baseUrl

  async getAddress(mobileNo: number): Promise<AddressType[]> {
    const response = await WebClient.get<AddressResponse>({
      baseUrl: this.baseUrl,
      path: this.config.findAddress,
      uriVariables: {mobileNo}
    })
    return response.data.map(({id, attributes}) => ({id, ...attributes}))
  }

  addAddress(data: AddressType) {
    return WebClient.post({
      baseUrl: this.baseUrl,
      path: this.config.address,
      body: {data}
    })
  }

  getOrders(data: Record<string, unknown>) {
    return WebClient.post<OnlineOrderResponse>({
      baseUrl: this.baseUrl,
      path: this.config.orders,
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
}

export const SellerService = new SellerService_()
