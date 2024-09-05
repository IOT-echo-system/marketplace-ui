import {apiConfig} from '../config/apiConfig'
import '../utils/extenstions'
import WebClient from './webClient'
import type {EstimateDelivery, EstimateDeliveryResponse} from './typing/shippingService'

class ShippingService_ {
  private readonly config = apiConfig.shipping
  private readonly baseUrl = apiConfig.baseUrl + apiConfig.shipping.baseUrl

  async estimateDelivery(pinCode: number): Promise<EstimateDelivery> {
    const {expected_delivery_date: expectedDeliveryDate, ...props} = await WebClient.get<EstimateDeliveryResponse>({
      baseUrl: this.baseUrl,
      path: this.config.estimateDelivery,
      queryParams: {pincode: pinCode}
    })
    return {...props, expectedDeliveryDate}
  }

  createOrder(param: {orderId: number; length: number; width: number; weight: number; height: number}) {
    return WebClient.post({
      baseUrl: this.baseUrl,
      path: this.config.order,
      body: param
    })
  }
}

export const ShippingService = new ShippingService_()
