import type {TRootActions} from '../../typing/store'
import type {PostalAddress} from '../../services/typing/postalService'

export const AddressAction = {
  SET_ADDRESS: 'SET_ADDRESS'
} as const

export type AddressType = {
  id?: number
  name: string
  address1: string
  address2: string
  address3: string
  mobileNo: number
} & PostalAddress

type AddressesType = {addresses: AddressType[]}
export const initAddressState: AddressesType = {addresses: []}

const addressReducer = (state: AddressesType, action: TRootActions): AddressesType => {
  switch (action.type) {
    case AddressAction.SET_ADDRESS:
      return {...action.payload}
    default:
      return state
  }
}

export default addressReducer
