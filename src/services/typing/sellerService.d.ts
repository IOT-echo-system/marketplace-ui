import type {AddressType} from '../../store/reducers'

export type AddressResponse = {data: Array<{id: number; attributes: AddressType}>}
