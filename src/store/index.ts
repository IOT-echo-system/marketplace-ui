import type {TRootActions, TRootReducer, TRootState} from '../typing/store'
import * as siteActions from './actions/site'
import * as cartActions from './actions/cart'
import * as userActions from './actions/user'
import * as addressActions from './actions/address'
import * as sellerActions from './actions/seller'
import * as othersActions from './actions/others'
import siteReducer, {initSiteState} from './reducers/site'
import cartReducer, {initCartState} from './reducers/cart'
import userReducer, {initUserState} from './reducers/user'
import addressReducer, {initAddressState} from './reducers/address'
import sellerReducer, {initSellerState} from './reducers/seller'
import othersReducer, {initOthersState} from './reducers/others'

const combineReducers = <S = TRootState>(reducers: {
  [K in keyof S]: TRootReducer<S[K]>
}): TRootReducer<S> => {
  return (state: S, action: TRootActions): S => {
    return (Object.keys(reducers) as Array<keyof S>).reduce(
      (prevState: S, key: keyof S) => ({
        ...prevState,
        [key]: reducers[key](prevState[key], action)
      }),
      state
    )
  }
}

export const rootState = {
  site: initSiteState,
  cart: initCartState,
  user: initUserState,
  seller: initSellerState,
  address: initAddressState,
  others: initOthersState
}

export const rootActions = {
  site: siteActions,
  cart: cartActions,
  user: userActions,
  seller: sellerActions,
  address: addressActions,
  others: othersActions
}

export const rootReducer = combineReducers({
  site: siteReducer,
  cart: cartReducer,
  user: userReducer,
  seller: sellerReducer,
  address: addressReducer,
  others: othersReducer
})
