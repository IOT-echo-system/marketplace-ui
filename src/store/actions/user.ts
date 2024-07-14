import type {User} from '../reducers/user'
import {UserAction} from '../reducers/user'

export const setUser = (user: User) => {
  return {type: UserAction.SET_USER, payload: {user}}
}

export const setUserLoading = (state: boolean) => ({type: UserAction.SET_USER_LOADING, payload: {state}})
