import type {Dispatch} from 'react'
import {useContext} from 'react'
import type {TRootActions, TRootState} from '../typing/store'
import {GlobalContext} from '../store/configureStore'

type TypedUseSelectorHook = <U>(cb: (state: TRootState) => U) => U

export const useSelector: TypedUseSelectorHook = cb => {
  const {state} = useContext(GlobalContext)
  return cb(state)
}

export const useDispatch = (): Dispatch<TRootActions> => {
  const {dispatch} = useContext(GlobalContext)
  return dispatch
}
