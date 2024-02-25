import type {Dispatch, SetStateAction} from 'react'
import React from 'react'
import {Button, FormContainer, FormInput} from '../../../atoms'
import {useVerifyOtp} from './useVerifyOtp'
import {Stack, Typography} from '@mui/material'

type VerifyOtpPropsType = {title: string; setOtpVerified: Dispatch<SetStateAction<boolean>>}

export const VerifyOtp: React.FC<VerifyOtpPropsType> = ({title, setOtpVerified}) => {
  const {handleSubmit, error, inputFields, otpGenerated, resendOtp, countDownTimer} = useVerifyOtp(setOtpVerified)

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant={'h5'}>{title}</Typography>
        {error && (
          <Typography variant={'body1'} color={'error'}>
            {error}
          </Typography>
        )}
        {inputFields.map((inputField, index) => (
          <FormInput key={`input-${index}`} {...inputField} />
        ))}
        <Stack direction={'row'} spacing={2}>
          {otpGenerated && (
            <Button
              variant={countDownTimer.isRunning() ? 'contained' : 'outlined'}
              size={'large'}
              fullWidth
              disabled={countDownTimer.isRunning()}
              onClick={resendOtp}
            >
              {countDownTimer.isRunning() && <>{countDownTimer.time}s</>}Resend OTP
            </Button>
          )}
          <Button type={'submit'} variant={'contained'} size={'large'} fullWidth>
            {otpGenerated ? 'Verify OTP' : 'Generate OTP'}
          </Button>
        </Stack>
      </Stack>
    </FormContainer>
  )
}
