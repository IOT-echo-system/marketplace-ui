import type {AddressType} from '../reducers/addressType'
import {AddressAction} from '../reducers/addressType'

export const setAddresses = (addresses: AddressType[]) => {
  return {type: AddressAction.SET_ADDRESS, payload: {addresses}}
}
