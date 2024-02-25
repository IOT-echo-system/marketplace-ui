import {act, renderHook} from '@testing-library/react'
import type {ChangeEvent, FormEvent} from 'react'
import {useVerifyOtp} from '../../../../../src/components/templates/auth/verifyOtp/useVerifyOtp'
import type {AuthService} from '../../../../../src/services'
import * as AuthServiceHook from '../../../../../src/services/authService'

jest.mock('../../../../../src/services/authService')
describe('Use verify otp Hook Test', () => {
  beforeEach(jest.resetAllMocks)
  afterEach(jest.resetAllMocks)

  it('should get initial values', () => {
    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      otpGenerated: false,
      resendOtp: expect.any(Function),
      countDownTimer: {
        time: 60,
        isRunning: expect.any(Function),
        pause: expect.any(Function),
        play: expect.any(Function),
        reset: expect.any(Function),
        resetAndPlay: expect.any(Function)
      },
      inputFields: [{label: 'Email', onChange: expect.any(Function), required: true, type: 'email', value: ''}]
    })
  })

  it('should update email value on handle change', () => {
    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    expect(result.current.inputFields[0].value).toStrictEqual('')

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[0].value).toStrictEqual('email')
  })

  it('should generate otp on handleSubmit', async () => {
    const mockGenerateOTP = jest.fn().mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({generateOTP: mockGenerateOTP} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(mockGenerateOTP).toHaveBeenCalledTimes(1)
    expect(mockGenerateOTP).toHaveBeenCalledWith('email')
  })

  it('should give error on generate otp on submit', async () => {
    const mockGenerateOTP = jest.fn().mockRejectedValue({message: 'Failed to generate otp'})
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({generateOTP: mockGenerateOTP} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(mockGenerateOTP).toHaveBeenCalledTimes(1)
    expect(mockGenerateOTP).toHaveBeenCalledWith('email')

    expect(result.current.error).toStrictEqual('Failed to generate otp')
  })

  it('should get state for verify otp', async () => {
    const mockGenerateOTP = jest.fn().mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({generateOTP: mockGenerateOTP} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      otpGenerated: true,
      resendOtp: expect.any(Function),
      countDownTimer: {
        time: 60,
        isRunning: expect.any(Function),
        pause: expect.any(Function),
        play: expect.any(Function),
        reset: expect.any(Function),
        resetAndPlay: expect.any(Function)
      },
      inputFields: [
        {type: 'email', value: 'email', onChange: expect.any(Function), label: 'Email', required: true, disabled: true},
        {type: 'number', value: '', onChange: expect.any(Function), label: 'Enter OTP', required: true}
      ]
    })
  })

  it('should update otp on change', async () => {
    const mockGenerateOTP = jest.fn().mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({generateOTP: mockGenerateOTP} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    await act(() =>
      result.current.inputFields[1].onChange!({target: {value: '123456'}} as unknown as ChangeEvent<HTMLInputElement>)
    )

    expect(result.current.inputFields[1].value).toStrictEqual('123456')
  })

  it('should verify otp on handleSubmit', async () => {
    const callback = jest.fn()
    const mockGenerateOTP = jest.fn().mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})
    const mockVerifyOTP = jest.fn().mockResolvedValue({success: true, token: 'token'})
    jest.spyOn(AuthServiceHook, 'AuthService').mockReturnValue({
      generateOTP: mockGenerateOTP,
      verifyOTP: mockVerifyOTP
    } as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(() => useVerifyOtp(callback))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    await act(() => {
      result.current.inputFields[1].onChange!({target: {value: '123456'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(mockVerifyOTP).toHaveBeenCalledTimes(1)
    expect(mockVerifyOTP).toHaveBeenCalledWith({email: 'email', otp: '123456', otpId: 'otpId'})
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(true)
  })

  it('should resend otp', async () => {
    const mockGenerateOTP = jest.fn().mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({generateOTP: mockGenerateOTP} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    await act(async () => {
      await result.current.resendOtp()
    })

    expect(mockGenerateOTP).toHaveBeenCalledTimes(2)
    expect(mockGenerateOTP).toHaveBeenCalledWith('email')
  })

  it('should resend otp', async () => {
    const mockGenerateOTP = jest.fn().mockRejectedValue({message: 'Wait util 60 seconds to generate new OTP'})
    jest
      .spyOn(AuthServiceHook, 'AuthService')
      .mockReturnValue({generateOTP: mockGenerateOTP} as unknown as ReturnType<typeof AuthService>)

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    await act(async () => {
      await result.current.resendOtp()
    })

    expect(mockGenerateOTP).toHaveBeenCalledTimes(2)
    expect(mockGenerateOTP).toHaveBeenCalledWith('email')

    expect(result.current.error).toStrictEqual('Wait util 60 seconds to generate new OTP')
  })
})
