import * as siteActions from './actions/site'
import siteReducer, {initSiteState} from './reducers/site'

import type {TRootActions, TRootReducer, TRootState} from '../typing/store'

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
  site: initSiteState
}

export const rootActions = {
  site: siteActions
}

export const rootReducer = combineReducers({
  site: siteReducer
})
