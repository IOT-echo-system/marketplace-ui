import type React from 'react'
import type {ChangeEvent} from 'react'
import {useState} from 'react'
import type {FormInputType} from '../../../atoms'
import type {CountDownTimerType} from '../../../../hooks'
import {useCountDownTimer, useForm} from '../../../../hooks'
import {AuthService} from '../../../../services'
import type {GenerateOTPResBody, VerifyOTPResBody} from '../../../../services/typing/auth'
import {setStorage, StorageKeys} from '../../../../utils/storage'
import type {ServerError} from '../../../../typing/error'

type UseVerifyOtpReturnType = {
  inputFields: FormInputType[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  error: string
  otpGenerated: boolean
  countDownTimer: CountDownTimerType
  resendOtp: () => void
}
const useVerifyOtp = (otpVerifiedCallback: (status: boolean) => void): UseVerifyOtpReturnType => {
  const [error, setError] = useState('')
  const [otpGenerated, setOtpGenerated] = useState(false)
  const {values, onChange, handleSubmit} = useForm({email: '', otp: '', otpId: ''})
  const countDownTimer = useCountDownTimer(60)
  const authService = AuthService()

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const authorizeOTP = async (): Promise<GenerateOTPResBody | VerifyOTPResBody> => {
    if (otpGenerated) {
      const verifyOTPRes = await authService.verifyOTP(values)
      countDownTimer.pause()
      setStorage(StorageKeys.AUTH, {token: verifyOTPRes.token})
      otpVerifiedCallback(verifyOTPRes.success)
      return verifyOTPRes
    }
    const generateOTPRes = await authService.generateOTP(values.email)
    setOtpGenerated(true)
    onChange('otpId', generateOTPRes.otpId)
    countDownTimer.resetAndPlay()
    return generateOTPRes
  }

  const onSubmit = () => {
    setError('')
    authorizeOTP().catch((error: ServerError) => {
      setError(error.message)
    })
  }

  const resendOtp = (): void => {
    authService
      .generateOTP(values.email)
      .then(generateOTPRes => {
        setOtpGenerated(true)
        onChange('otpId', generateOTPRes.otpId)
        countDownTimer.resetAndPlay()
        return generateOTPRes
      })
      .catch((error: ServerError) => {
        setError(error.message)
      })
  }

  const inputFields: FormInputType[] = [
    {
      type: 'email',
      value: values.email,
      onChange: handleChange('email'),
      label: 'Email',
      required: true
    }
  ]

  const inputFieldsForOtp: FormInputType[] = [
    {
      type: 'email',
      value: values.email,
      onChange: handleChange('email'),
      label: 'Email',
      required: true,
      disabled: true
    },
    {
      type: 'number',
      value: values.otp,
      onChange: handleChange('otp'),
      label: 'Enter OTP',
      required: true
    }
  ]

  return {
    error,
    handleSubmit: handleSubmit(onSubmit),
    inputFields: otpGenerated ? inputFieldsForOtp : inputFields,
    countDownTimer,
    otpGenerated,
    resendOtp
  }
}

export {useVerifyOtp}
