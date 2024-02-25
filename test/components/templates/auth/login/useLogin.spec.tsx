import {act, renderHook} from '@testing-library/react'

import * as NextRouter from 'next/router'

import type {Router} from 'next/router'
import type {ChangeEvent, FormEvent} from 'react'
import {useLogin} from '../../../../../src/components/templates/auth/login/useLogin'
import {userBuilder} from '../../../../builders/stateBuilder'
import type {AuthService} from '../../../../../src/services'
import * as AuthServiceHook from '../../../../../src/services/authService'

jest.mock('../../../../../src/services/authService')

describe('Use Login Hook Test', () => {
  const mockRouter = {} as unknown as Router
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(NextRouter, 'useRouter').mockReturnValue(mockRouter)
  })
  afterEach(jest.resetAllMocks)

  it('should get initial values', () => {
    const {result} = renderHook(useLogin)

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      inputFields: [
        {
          label: 'Email',
          onChange: expect.any(Function),
          required: true,
          type: 'email',
          value: ''
        },
        {
          label: 'Password',
          onChange: expect.any(Function),
          required: true,
          type: 'password',
          value: ''
        }
      ]
    })

    expect(NextRouter.useRouter).toHaveBeenCalledTimes(1)
    expect(NextRouter.useRouter).toHaveBeenCalledWith()
  })

  it('should update email and password value on handle change', () => {
    const {result} = renderHook(useLogin)

    expect(result.current.inputFields[0].value).toStrictEqual('')
    expect(result.current.inputFields[1].value).toStrictEqual('')

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[0].value).toStrictEqual('email')

    act(() => {
      result.current.inputFields[1].onChange!({target: {value: 'name'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[1].value).toStrictEqual('name')
  })

  it('should submit form on handleSubmit', async () => {
    const mockUser = userBuilder({name: 'name'})
    const mockLogin = jest.fn().mockResolvedValue(mockUser)
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({login: mockLogin} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(useLogin)

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(mockLogin).toHaveBeenCalledTimes(1)
    expect(mockLogin).toHaveBeenCalledWith({email: 'email', password: 'password'})
  })

  it('should give error on failure of form submit', async () => {
    const mockLogin = jest.fn().mockRejectedValue({message: 'already registered'})
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({login: mockLogin} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(useLogin)

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(mockLogin).toHaveBeenCalledTimes(1)
    expect(mockLogin).toHaveBeenCalledWith({email: 'email', password: 'password'})

    expect(result.current.error).toStrictEqual('already registered')
  })
})
