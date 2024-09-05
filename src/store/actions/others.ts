import type {OthersState} from '../reducers'
import {OthersAction} from '../reducers'

export const createOthersItem = <K extends keyof OthersState = keyof OthersState>(name: K, value: OthersState[K]) => {
  return {type: OthersAction.OTHERS_CREATE_ITEM, payload: {name, value}}
}

export const updateOthersItem = <K extends keyof OthersState = keyof OthersState>(name: K, value: OthersState[K]) => {
  return {type: OthersAction.OTHERS_UPDATE_ITEM, payload: {name, value}}
}

export const deleteOthersItem = <K extends keyof OthersState>(name: K) => {
  return {type: OthersAction.OTHERS_DELETE_ITEM, payload: {name}}
}
