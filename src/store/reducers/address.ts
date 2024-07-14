import type {TRootActions} from '../../typing/store'

export const AddressAction = {
  SET_ADDRESS: 'SET_ADDRESS'
} as const

export type Address = {
  id: number
  name: string
  address1: string
  address2: string
  address3: string
  city: string
  district: string
  state: string
  mobileNo: number
  pinCode: number
}

type AddressesType = {addresses: Address[]}
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
