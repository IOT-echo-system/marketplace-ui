import type {AddressType} from '../reducers/address'
import {AddressAction} from '../reducers/address'

export const setAddresses = (addresses: AddressType[]) => {
  return {type: AddressAction.SET_ADDRESS, payload: {addresses}}
}
