import {render} from '@testing-library/react'
import ForgotPasswordPage from '../../../src/pages/auth/forgot-password'
import React from 'react'
import {Config} from '../../../src/config'
import * as MediaHook from '../../../src/hooks/useMedia'
import {ResetPassword, VerifyOtp} from '../../../src/components/templates/auth'

jest.mock('../../../src/components/templates/auth/verifyOtp/VerifyOtp')
jest.mock('../../../src/components/templates/auth/resetPassword/ResetPassword')

jest.mock('react', (): typeof React => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))
jest.mock('../../../src/hooks/useMedia')

describe('Forgot password page test', () => {
  const mockUseState = React.useState as jest.Mock
  beforeEach(jest.clearAllMocks)
  afterEach(jest.clearAllMocks)

  it('should match with the snapshot', () => {
    mockUseState.mockReturnValue([false, jest.fn()])
    jest.spyOn(MediaHook, 'useMedia').mockReturnValue({md: true, sm: true, xl: false, lg: false})

    const {container} = render(<ForgotPasswordPage />)

    expect(container).toMatchSnapshot()
    expect(VerifyOtp).toHaveBeenCalledTimes(1)
    expect(VerifyOtp).toHaveBeenCalledWith({setOtpVerified: expect.any(Function), title: 'Forgot password'}, {})
    expect(ResetPassword).not.toHaveBeenCalled()
  })

  it('should match with the snapshot if OTP verified', () => {
    mockUseState.mockReturnValue([true, jest.fn()])
    jest.spyOn(MediaHook, 'useMedia').mockReturnValue({md: true, sm: true, xl: false,  lg: false})

    const {container} = render(<ForgotPasswordPage />)

    expect(container).toMatchSnapshot()

    expect(ResetPassword).toHaveBeenCalledTimes(1)
    expect(ResetPassword).toHaveBeenCalledWith(
      {
        redirectTo: Config.LOGIN_PAGE_PATH,
        title: 'Change password',
        withOldPassword: false
      },
      {}
    )
    expect(VerifyOtp).not.toHaveBeenCalled()
  })

  it('should match with the snapshot if OTP verified for mobile', () => {
    mockUseState.mockReturnValue([true, jest.fn()])
    jest.spyOn(MediaHook, 'useMedia').mockReturnValue({md: false, sm: true, xl: false,  lg: false})

    const {container} = render(<ForgotPasswordPage />)

    expect(container).toMatchSnapshot()

    expect(ResetPassword).toHaveBeenCalledTimes(1)
    expect(ResetPassword).toHaveBeenCalledWith(
      {
        redirectTo: Config.LOGIN_PAGE_PATH,
        title: 'Change password',
        withOldPassword: false
      },
      {}
    )
    expect(VerifyOtp).not.toHaveBeenCalled()
  })
})
