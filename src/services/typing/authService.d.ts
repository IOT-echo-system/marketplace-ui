import type {User} from '../../store/reducers/user'
import type {Address} from '../../store/reducers/address'

export type ServerError = {error: {status: number; name: string; message: string}}

export type UserResponse = {jwt: string; user: User}
export type AddressResponse = {data: {id: number; attributes: Address}}
