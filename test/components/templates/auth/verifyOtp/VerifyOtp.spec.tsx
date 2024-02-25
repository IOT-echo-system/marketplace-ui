import React from 'react'
import {render} from '@testing-library/react'
import {VerifyOtp} from '../../../../../src/components/templates/auth'
import * as UseVerifyOTPHook from '../../../../../src/components/templates/auth/verifyOtp/useVerifyOtp'

jest.mock('../../../../../src/components/templates/auth/verifyOtp/useVerifyOtp')

describe('Verify OTP Template Test', () => {
  const mockUseVerifyOTP = {
    inputFields: [{type: 'email', label: 'email'}],
    handleSubmit: jest.fn(),
    error: '',
    otpGenerated: false,
    countDownTimer: {
      time: 60,
      reset: jest.fn(),
      play: jest.fn(),
      resetAndPlay: jest.fn(),
      pause: jest.fn(),
      isRunning: jest.fn()
    },
    resendOtp: jest.fn()
  }

  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(UseVerifyOTPHook, 'useVerifyOtp').mockReturnValue(mockUseVerifyOTP)
  })
  afterEach(jest.resetAllMocks)

  it('should match with the snapshot', () => {
    const {container} = render(<VerifyOtp title={'Generate OTP'} setOtpVerified={jest.fn()} />)

    expect(UseVerifyOTPHook.useVerifyOtp).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
  })

  it('should match with the snapshot with otp generated', () => {
    const mockUseVerifyOTP = {
      inputFields: [{type: 'email', label: 'email'}],
      handleSubmit: jest.fn(),
      error: '',
      otpGenerated: true,
      countDownTimer: {
        time: 60,
        reset: jest.fn(),
        play: jest.fn(),
        resetAndPlay: jest.fn(),
        pause: jest.fn(),
        isRunning: jest.fn().mockReturnValue(true)
      },
      resendOtp: jest.fn()
    }
    jest.spyOn(UseVerifyOTPHook, 'useVerifyOtp').mockReturnValue(mockUseVerifyOTP)

    const {container} = render(<VerifyOtp title={'Verify OTP'} setOtpVerified={jest.fn()} />)

    expect(UseVerifyOTPHook.useVerifyOtp).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
  })

  it('should match with the snapshot with otp generated and after resend otp timer stop', () => {
    const mockUseVerifyOTP = {
      inputFields: [{type: 'email', label: 'email'}],
      handleSubmit: jest.fn(),
      error: '',
      otpGenerated: true,
      countDownTimer: {
        time: 60,
        reset: jest.fn(),
        play: jest.fn(),
        resetAndPlay: jest.fn(),
        pause: jest.fn(),
        isRunning: jest.fn().mockReturnValue(false)
      },
      resendOtp: jest.fn()
    }
    jest.spyOn(UseVerifyOTPHook, 'useVerifyOtp').mockReturnValue(mockUseVerifyOTP)

    const {container} = render(<VerifyOtp title={'Verify OTP'} setOtpVerified={jest.fn()} />)

    expect(UseVerifyOTPHook.useVerifyOtp).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
  })
})
