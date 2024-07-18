import React from 'react'
import {Stack} from '@mui/material'
import {Form} from '../../molecules'
import {useContactUs} from './useContactUs'
import {CenteredContainer} from '../../atoms'

export const ContactUs: React.FC = () => {
  const {inputFields, handleSubmit, submitBtnText, submitBtnDisabled, loading} = useContactUs()
  return (
    <Stack spacing={2} bgcolor={'background.paper'} alignItems={'center'}>
      <CenteredContainer>
        <Form
          title={'Contact us'}
          inputFields={inputFields}
          handleSubmit={handleSubmit}
          submitBtnText={submitBtnText}
          submitBtnDisabled={submitBtnDisabled}
          loading={loading}
        />
      </CenteredContainer>
    </Stack>
  )
}
