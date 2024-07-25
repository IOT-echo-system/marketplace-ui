import type {TRootActions} from '../../typing/store'

export const UserAction = {
  SET_USER: 'SET_USER',
  SET_USER_LOADING: 'SET_USER_LOADING'
} as const

export type User = {
  name: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  phone: number | null
  loading: boolean
  customRole: 'SELLER' | null
}

export const initUserState: User = {
  blocked: false,
  confirmed: false,
  name: '',
  createdAt: '',
  email: '',
  phone: null,
  provider: '',
  updatedAt: '',
  username: '',
  loading: true,
  customRole: null
}

const userReducer = (state: User, action: TRootActions): User => {
  switch (action.type) {
    case UserAction.SET_USER:
      return {...state, ...action.payload.user}
    case UserAction.SET_USER_LOADING:
      return {...state, loading: action.payload.state}
    default:
      return state
  }
}

export default userReducer
