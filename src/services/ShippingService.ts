import {apiConfig} from '../config/apiConfig'
import '../utils/extenstions'
import WebClient from './webClient'
import type {EstimateDelivery, EstimateDeliveryResponse} from './typing/shippingService'

class ShippingService_ {
  private readonly config = apiConfig.shipping
  private readonly baseUrl = apiConfig.baseUrl + apiConfig.shipping.baseUrl

  estimateDelivery(pinCode: number): Promise<EstimateDelivery> {
    return WebClient.get<EstimateDeliveryResponse>({
      baseUrl: this.baseUrl,
      path: this.config.estimateDelivery,
      queryParams: {pincode: pinCode}
    }).then(({expected_delivery_date: expectedDeliveryDate, ...props}) => ({...props, expectedDeliveryDate}))
  }
}

export const ShippingService = new ShippingService_()
