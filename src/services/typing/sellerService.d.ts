import type {AddressType} from '../../store/reducers'

export type AddressesResponse = {data: Array<{id: number; attributes: AddressType}>}
export type AddressResponse = {data: {id: number; attributes: AddressType}}
