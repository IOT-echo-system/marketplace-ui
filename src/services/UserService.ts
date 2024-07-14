import {apiConfig} from '../config/apiConfig'
import '../utils/extenstions'
import WebClient from './webClient'
import type {AddressResponse, UserResponse} from './typing/authService'
import type {User} from '../store/reducers/user'
import type {Address} from '../store/reducers/address'

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

  async addAddress(data: unknown): Promise<Address> {
    const response = await WebClient.post<AddressResponse>({
      baseUrl: this.baseUrl,
      path: this.config.address,
      body: {data}
    })
    return {...response.data.attributes, id: response.data.id}
  }

  async getAddresses(): Promise<Address[]> {
    return WebClient.get<Address[]>({
      baseUrl: this.baseUrl,
      path: this.config.address
    })
  }
}

export const UserService = new AuthService_()
