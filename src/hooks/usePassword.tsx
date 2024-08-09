import type {ChangeEvent} from 'react'
import {useState} from 'react'

type UserPasswordReturnType = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
  helperText: string
  onClear: () => void
}

export const usePassword = (initialValue: string): UserPasswordReturnType => {
  const [value, setValue] = useState(initialValue)
  const [helperText, setHelperText] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const password = event.target.value
    setValue(password)
    if (password.length < 8) {
      setHelperText('Password must be at least 8 characters long')
      return
    }

    if (!/[A-Z]/.test(password)) {
      setHelperText('Password must contain at least one uppercase letter')
      return
    }

    if (!/[a-z]/.test(password)) {
      setHelperText('Password must contain at least one lowercase letter')
      return
    }

    if (!/\d/.test(password)) {
      setHelperText('Password must contain at least one digit')
      return
    }

    setHelperText('')
  }

  const onClear = () => {
    setValue(initialValue)
  }

  return {onChange, value, helperText, onClear}
}
