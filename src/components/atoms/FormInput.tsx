import React, {type SyntheticEvent} from 'react'
import type {StackProps, TextFieldProps} from '@mui/material'
import {Autocomplete, FormControlLabel, Radio, RadioGroup, Stack, TextField} from '@mui/material'

export type FormSelectOption = {label: string; value: string}
export type FormSelectInputType = TextFieldProps & {
  inputType: 'selectField'
  options: readonly FormSelectOption[]
  defaultValue?: FormSelectOption
  handleChange: (value: string) => void
}

export type FormRadioInputType = TextFieldProps &
  StackProps & {
    inputType: 'radioField'
    options: Array<{control?: React.ReactElement; label: React.ReactNode; value: string | number}>
    handleChange: (value: string) => void
  }

type FormInputTypeMap = {
  textField: TextFieldProps & {inputType: 'textField'}
  selectField: FormSelectInputType
  radioField: FormRadioInputType
}

export type FormInputType<P extends keyof FormInputTypeMap = keyof FormInputTypeMap> = FormInputTypeMap[P]

export const FormInput: React.FC<FormInputType> = props => {
  const {inputType, ...formInput} = props
  if (inputType === 'selectField') {
    const {options, handleChange, ...selectInput} = formInput as FormSelectInputType
    const onChange = (_event: SyntheticEvent, option: FormSelectOption | null) => {
      handleChange(option?.value ?? '')
    }

    return (
      <Autocomplete
        options={options}
        onChange={onChange}
        getOptionLabel={option => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={params => <TextField {...selectInput} {...params} />}
        selectOnFocus
        autoSelect
        size={props.size}
        clearOnBlur
        fullWidth
      />
    )
  }
  if (inputType === 'radioField') {
    const {options, value, handleChange, ...props} = formInput as FormRadioInputType
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event.target.value)
    }
    return (
      <RadioGroup value={value} onChange={onChange}>
        <Stack direction={props.direction ?? 'row'} spacing={props.spacing ?? 4}>
          {options.map(({value, control, label}) => {
            return <FormControlLabel key={value} value={value} control={control ?? <Radio />} label={label} />
          })}
        </Stack>
      </RadioGroup>
    )
  }
  return <TextField variant={formInput.variant ?? 'outlined'} {...formInput} />
}
