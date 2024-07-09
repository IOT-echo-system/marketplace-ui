import type {Dispatch, PropsWithChildren} from 'react'
import React, {createContext, useMemo, useReducer} from 'react'
import {rootReducer, rootState} from './index'
import type {TRootActions, TRootState} from '../typing/store'

type GlobalContextType = {
  state: TRootState
  dispatch: Dispatch<TRootActions>
}
export const GlobalContext = createContext<GlobalContextType>({
  state: rootState,
  dispatch: () => ''
})

type StoreProviderPropsType = PropsWithChildren<{initialValue?: TRootState}>

const StoreProvider: React.FC<StoreProviderPropsType> = ({children, initialValue}) => {
  const [state, dispatch] = useReducer(rootReducer, initialValue ?? rootState)

  const store = useMemo(() => ({state, dispatch}), [state])

  return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
}

export default StoreProvider
