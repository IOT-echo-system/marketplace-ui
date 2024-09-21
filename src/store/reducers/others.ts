import type {TRootActions} from '../../typing/store'
import type {Order, SellerOrder} from '../../services/typing/userService'

export const OthersAction = {
  OTHERS_CREATE_ITEM: 'OTHERS_CREATE_ITEM',
  OTHERS_UPDATE_ITEM: 'OTHERS_UPDATE_ITEM',
  OTHERS_DELETE_ITEM: 'OTHERS_DELETE_ITEM'
} as const

export interface OthersState {
  order: Order | null
  sellerOrder: SellerOrder | null
}

export const initOthersState: OthersState = {order: null, sellerOrder: null}

const othersReducer = (state: OthersState, action: TRootActions): OthersState => {
  switch (action.type) {
    case OthersAction.OTHERS_CREATE_ITEM:
      return {...state, [action.payload.name]: action.payload.value}
    case OthersAction.OTHERS_UPDATE_ITEM: {
      return {...state, [action.payload.name]: Object.assign({...state[action.payload.name]}, action.payload.value)}
    }
    case OthersAction.OTHERS_DELETE_ITEM:
      return {...state, [action.payload.name]: null}
    default:
      return state
  }
}

export default othersReducer
