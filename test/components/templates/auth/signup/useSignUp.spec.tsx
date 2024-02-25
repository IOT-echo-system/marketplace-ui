import {act, renderHook} from '@testing-library/react'
import * as NextRouter from 'next/router'

import type {Router} from 'next/router'
import type {ChangeEvent, FormEvent} from 'react'
import {useSignUp} from '../../../../../src/components/templates/auth/signup/useSignUp'
import type {AuthService} from '../../../../../src/services'
import * as AuthServiceHook from '../../../../../src/services/authService'

jest.mock('../../../../../src/services/authService')

describe('Use SignUp Hook Test', () => {
  const mockRouter = {} as unknown as Router
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(NextRouter, 'useRouter').mockReturnValue(mockRouter)
  })
  afterEach(jest.resetAllMocks)

  it('should get initial values', () => {
    const {result} = renderHook(useSignUp)

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      submitBtnDisabled: false,
      inputFields: [
        {label: 'Name', onChange: expect.any(Function), required: true, value: ''},
        {label: 'Email', onChange: expect.any(Function), required: true, type: 'email', value: ''},
        {
          label: 'Password',
          onChange: expect.any(Function),
          required: true,
          type: 'password',
          value: '',
          error: false,
          helperText: ''
        },
        {
          label: 'Confirm password',
          helperText: '',
          error: false,
          onChange: expect.any(Function),
          required: true,
          type: 'password',
          value: ''
        }
      ]
    })

    expect(NextRouter.useRouter).toHaveBeenCalledTimes(2)
    expect(NextRouter.useRouter).toHaveBeenCalledWith()
  })

  it('should update email and password value on handle change', () => {
    const {result} = renderHook(useSignUp)

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

  it('should give error if password is not matching the criteria', () => {
    const {result} = renderHook(useSignUp)

    expect(result.current.inputFields[2].value).toStrictEqual('')

    act(() => {
      result.current.inputFields[2].onChange!({target: {value: 'pass'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[2]).toStrictEqual({
      error: true,
      helperText: 'Password must be at least 8 characters long',
      label: 'Password',
      onChange: expect.any(Function),
      required: true,
      type: 'password',
      value: 'pass'
    })

    act(() => {
      result.current.inputFields[2].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[2]).toStrictEqual({
      error: true,
      helperText: 'Password must contain at least one uppercase letter',
      label: 'Password',
      onChange: expect.any(Function),
      required: true,
      type: 'password',
      value: 'password'
    })

    act(() => {
      result.current.inputFields[2].onChange!({target: {value: 'PASSWORD'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[2]).toStrictEqual({
      error: true,
      helperText: 'Password must contain at least one lowercase letter',
      label: 'Password',
      onChange: expect.any(Function),
      required: true,
      type: 'password',
      value: 'PASSWORD'
    })

    act(() => {
      result.current.inputFields[2].onChange!({target: {value: 'Password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[2]).toStrictEqual({
      error: true,
      helperText: 'Password must contain at least one digit',
      label: 'Password',
      onChange: expect.any(Function),
      required: true,
      type: 'password',
      value: 'Password'
    })

    act(() => {
      result.current.inputFields[2].onChange!({
        target: {value: 'Password1'}
      } as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[2]).toStrictEqual({
      error: false,
      helperText: '',
      label: 'Password',
      onChange: expect.any(Function),
      required: true,
      type: 'password',
      value: 'Password1'
    })
  })

  it('should submit form on handleSubmit', async () => {
    const mockSignUp = jest.fn().mockResolvedValue({email: 'email', name: 'name', userId: 'userId'})
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({signUp: mockSignUp} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(useSignUp)

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'name'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[2].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(mockSignUp).toHaveBeenCalledTimes(1)
    expect(mockSignUp).toHaveBeenCalledWith({name: 'name', email: 'email', password: 'password'})
  })

  it('should give error on failure of form submit', async () => {
    const mockSignUp = jest.fn().mockRejectedValue({message: 'already registered'})
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({signUp: mockSignUp} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(useSignUp)

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'name'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[2].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[3].onChange!({target: {value: 'passwo'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(mockSignUp).toHaveBeenCalledTimes(1)
    expect(mockSignUp).toHaveBeenCalledWith({name: 'name', email: 'email', password: 'password'})

    expect(result.current.error).toStrictEqual('already registered')
    expect(result.current.inputFields[3].helperText).toStrictEqual('password and confirm password should match.')
  })
})
