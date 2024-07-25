import {apiConfig} from '../config/apiConfig'
import '../utils/extenstions'
import WebClient from './webClient'
import type {AddressResponse, Coupon, Order, OrderResponse, PaymentResponse, UserResponse} from './typing/userService'
import type {AddressType, CartStateType, User} from '../store/reducers'

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
      path: this.config.orders,
      body: {data: {...data, user: 'userid'}}
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

  async getOrders(): Promise<Order[]> {
    return WebClient.get<Order[]>({
      baseUrl: this.baseUrl,
      path: this.config.orders
    })
  }

  async applyCoupon({code}: {code: string}): Promise<Coupon> {
    const response = await WebClient.get<Coupon[]>({
      baseUrl: this.baseUrl,
      path: this.config.coupon,
      uriVariables: {code}
    })
    if (response.isEmpty()) {
      throw new Error('Coupon not found!!')
    } else {
      return response[0]
    }
  }

  async getOrder(orderId: string): Promise<Order> {
    const response = await WebClient.get<Order[]>({
      baseUrl: this.baseUrl,
      path: this.config.order,
      uriVariables: {orderId}
    })
    if (response.isEmpty()) {
      throw new Error('Data not found!!')
    }
    return response[0]
  }
}

export const UserService = new AuthService_()
