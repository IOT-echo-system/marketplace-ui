import React from 'react'
import {render} from '@testing-library/react'
import {LogIn} from '../../../../../src/components/templates/auth'
import * as UseLoginHooks from '../../../../../src/components/templates/auth/login/useLogin'
import {Form} from '../../../../../src/components/molecules'
import * as MediaHook from '../../../../../src/hooks/useMedia'

jest.mock('../../../../../src/components/molecules/Form')
jest.mock('../../../../../src/components/templates/auth/login/useLogin')
jest.mock('../../../../../src/hooks/useMedia')

describe('Login Template Test', () => {
  const mockUseLogin = {inputFields: [], error: '', handleSubmit: jest.fn()}

  beforeEach(() => {
    jest.resetAllMocks()

    jest.spyOn(UseLoginHooks, 'useLogin').mockReturnValue(mockUseLogin)
  })
  afterEach(jest.resetAllMocks)

  it('should match with the snapshot', () => {
    jest.spyOn(MediaHook, 'useMedia').mockReturnValue({md: true, sm: true, xl: false, lg: false})

    const {container} = render(<LogIn />)

    expect(UseLoginHooks.useLogin).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
    expect(MediaHook.useMedia).toBeCalledTimes(1)
    expect(Form).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledWith(
      {
        error: '',
        handleSubmit: expect.any(Function),
        inputFields: [],
        submitBtnText: 'Login',
        title: 'Login'
      },
      {}
    )
  })

  it('should match with the snapshot for mobile', () => {
    jest.spyOn(MediaHook, 'useMedia').mockReturnValue({md: false, sm: true, xl: false, lg: false})

    const {container} = render(<LogIn />)

    expect(UseLoginHooks.useLogin).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
    expect(MediaHook.useMedia).toBeCalledTimes(1)
    expect(Form).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledWith(
      {
        error: '',
        handleSubmit: expect.any(Function),
        inputFields: [],
        submitBtnText: 'Login',
        title: 'Login'
      },
      {}
    )
  })
})
