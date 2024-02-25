import React from 'react'
import {render} from '@testing-library/react'
import {ResetPassword} from '../../../../../src/components/templates/auth'
import * as UseResetPasswordHook from '../../../../../src/components/templates/auth/resetPassword/useResetPassword'
import {Form} from '../../../../../src/components/molecules'

jest.mock('../../../../../src/components/molecules/Form')
jest.mock('../../../../../src/components/templates/auth/resetPassword/useResetPassword')

describe('Reset Password Template Test', () => {
  const mockUseReset = {inputFields: [], error: '', handleSubmit: jest.fn()}

  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(UseResetPasswordHook, 'useResetPassword').mockReturnValue(mockUseReset)
  })
  afterEach(jest.resetAllMocks)

  it('should match with the snapshot', () => {
    const {container} = render(<ResetPassword title={'Change password'} withOldPassword={false} redirectTo={'/'} />)

    expect(UseResetPasswordHook.useResetPassword).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
    expect(Form).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledWith(
      {
        error: '',
        handleSubmit: expect.any(Function),
        inputFields: [],
        submitBtnText: 'Reset password',
        title: 'Change password'
      },
      {}
    )
  })

  it('should match with the snapshot with old password', () => {
    const {container} = render(<ResetPassword title={'Change password'} withOldPassword redirectTo={'/'} />)

    expect(UseResetPasswordHook.useResetPassword).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
    expect(Form).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledWith(
      {
        error: '',
        handleSubmit: expect.any(Function),
        inputFields: [],
        submitBtnText: 'Reset password',
        title: 'Change password'
      },
      {}
    )
  })
})
