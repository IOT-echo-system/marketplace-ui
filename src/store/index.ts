import * as siteActions from './actions/site'
import * as cartActions from './actions/cart'
import * as userActions from './actions/user'
import * as addressActions from './actions/address'
import siteReducer, {initSiteState} from './reducers/site'

import type {TRootActions, TRootReducer, TRootState} from '../typing/store'
import cartReducer, {initCartState} from './reducers/cart'
import userReducer, {initUserState} from './reducers/user'
import addressReducer, {initAddressState} from './reducers/address'

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
  address: initAddressState
}

export const rootActions = {
  site: siteActions,
  cart: cartActions,
  user: userActions,
  address: addressActions
}

export const rootReducer = combineReducers({
  site: siteReducer,
  cart: cartReducer,
  user: userReducer,
  address: addressReducer
})
