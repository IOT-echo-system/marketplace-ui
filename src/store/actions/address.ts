import type {Address} from '../reducers/address'
import {AddressAction} from '../reducers/address'

export const setAddresses = (addresses: Address[]) => {
  return {type: AddressAction.SET_ADDRESS, payload: {addresses}}
}
