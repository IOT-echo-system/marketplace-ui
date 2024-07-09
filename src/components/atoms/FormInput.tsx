import React, {type SyntheticEvent} from 'react'
import type {TextFieldProps} from '@mui/material'
import {Autocomplete} from '@mui/material'
import {TextField} from '@mui/material'

export type FormSelectOption = {label: string; value: string}
export type FormSelectInputType = TextFieldProps & {
  inputType: 'selectField'
  options: readonly FormSelectOption[]
  defaultValue?: FormSelectOption
  handleChange: <T>(value: T) => void
}

type FormInputTypeMap = {
  textField: TextFieldProps & {inputType: 'textField'}
  selectField: FormSelectInputType
}

export type FormInputType<P extends keyof FormInputTypeMap = keyof FormInputTypeMap> = FormInputTypeMap[P]

export const FormInput: React.FC<FormInputType> = props => {
  const {inputType, ...formInput} = props
  if (inputType === 'selectField') {
    const {options, handleChange, defaultValue, ...selectInput} = formInput as FormSelectInputType
    const onChange = (_event: SyntheticEvent, option: FormSelectOption | null) => {
      if (option !== null) {
        handleChange(option.value)
      }
    }

    return (
      <Autocomplete
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        getOptionLabel={option => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={params => <TextField {...selectInput} {...params} />}
        selectOnFocus
        autoSelect
        clearOnBlur
        fullWidth
      />
    )
  }
  return <TextField variant={formInput.variant ?? 'outlined'} {...formInput} />
}
