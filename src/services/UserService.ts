import {apiConfig} from '../config/apiConfig'
import '../utils/extenstions'
import WebClient from './webClient'
import type {AddressResponse, OrderResponse, PaymentResponse, UserResponse} from './typing/authService'
import type {User} from '../store/reducers/user'
import type {AddressType} from '../store/reducers/addressType'
import type {CartStateType} from '../store/reducers/cart'

class AuthService_ {
  private readonly config = apiConfig.user
  private readonly baseUrl = apiConfig.baseUrl

  async signUp(data: Record<string, unknown>): Promise<UserResponse> {
    return WebClient.post<UserResponse>({
      baseUrl: this.baseUrl,
      path: this.config.register,
      body: {...data, role: 'Authenticated'}
    })
  }

  getUserData(): Promise<User> {
    return WebClient.get<User>({
      baseUrl: this.baseUrl,
      path: this.config.me
    })
  }

  login(data: {identifier: string; password: string}): Promise<UserResponse> {
    return WebClient.post<UserResponse>({
      baseUrl: this.baseUrl,
      path: this.config.login,
      body: data
    })
  }

  async addAddress(data: unknown): Promise<AddressType> {
    const response = await WebClient.post<AddressResponse>({
      baseUrl: this.baseUrl,
      path: this.config.address,
      body: {data}
    })
    return {...response.data.attributes, id: response.data.id}
  }

  async getAddresses(): Promise<AddressType[]> {
    return WebClient.get<AddressType[]>({
      baseUrl: this.baseUrl,
      path: this.config.address
    })
  }

  placeOrder(data: CartStateType): Promise<PaymentResponse> {
    return WebClient.post<PaymentResponse>({
      baseUrl: this.baseUrl,
      path: this.config.order,
      body: {data}
    })
  }

  async getOrderDetails(orderId: string) {
    const response = await WebClient.get<OrderResponse>({
      baseUrl: this.baseUrl,
      path: this.config.orderDetails,
      uriVariables: {orderId}
    })
    return {...response.data.attributes, id: response.data.id}
  }

  verifyPayment(data: Record<string, unknown>): Promise<PaymentResponse> {
    return WebClient.post<PaymentResponse>({
      baseUrl: this.baseUrl,
      path: this.config.verifyPayment,
      body: data
    })
  }
}

export const UserService = new AuthService_()
