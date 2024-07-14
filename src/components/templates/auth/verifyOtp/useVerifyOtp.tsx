import type React, {ChangeEvent} from 'react'
import {useState} from 'react'
import type {FormInputType} from '../../../atoms'
import type {CountDownTimerType} from '../../../../hooks'
import {useCountDownTimer, useForm, useToast} from '../../../../hooks'
import type {GenerateOTPResBody, VerifyOTPResBody} from '../../../../services/typing/auth'

type UseVerifyOtpReturnType = {
  inputFields: FormInputType[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  otpGenerated: boolean
  countDownTimer: CountDownTimerType
  resendOtp: () => void
}
const useVerifyOtp = (otpVerifiedCallback: (status: boolean) => void): UseVerifyOtpReturnType => {
  const [otpGenerated, setOtpGenerated] = useState(false)
  const {values, onChange, handleSubmit} = useForm({email: '', otp: '', otpId: ''})
  const countDownTimer = useCountDownTimer(60)
  const toast = useToast()

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const authorizeOTP = async (): Promise<GenerateOTPResBody | VerifyOTPResBody> => {
    // if (otpGenerated) {
    //   const verifyOTPRes = await UserService.verifyOTP(values)
    //   countDownTimer.pause()
    //   setStorage(StorageKeys.AUTH, {token: verifyOTPRes.token})
    //   otpVerifiedCallback(verifyOTPRes.success)
    //   return verifyOTPRes
    // }
    // const generateOTPRes = await UserService.generateOTP(values.email)
    // setOtpGenerated(true)
    // onChange('otpId', generateOTPRes.otpId)
    // countDownTimer.resetAndPlay()
    // return generateOTPRes
  }

  const onSubmit = () => {
    authorizeOTP().catch(toast.error)
  }

  const resendOtp = (): void => {
    // UserService.generateOTP(values.email)
    //   .then(generateOTPRes => {
    //     setOtpGenerated(true)
    //     onChange('otpId', generateOTPRes.otpId)
    //     countDownTimer.resetAndPlay()
    //     return generateOTPRes
    //   })
    //   .catch(toast.error)
  }

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      size: 'small',
      type: 'email',
      value: values.email,
      onChange: handleChange('email'),
      label: 'Email',
      required: true
    }
  ]

  const inputFieldsForOtp: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'email',
      size: 'small',
      value: values.email,
      onChange: handleChange('email'),
      label: 'Email',
      required: true,
      disabled: true
    },
    {
      inputType: 'textField',
      type: 'number',
      size: 'small',
      value: values.otp,
      onChange: handleChange('otp'),
      label: 'Enter OTP',
      required: true
    }
  ]

  return {
    handleSubmit: handleSubmit(onSubmit),
    inputFields: otpGenerated ? inputFieldsForOtp : inputFields,
    countDownTimer,
    otpGenerated,
    resendOtp
  }
}

export {useVerifyOtp}
