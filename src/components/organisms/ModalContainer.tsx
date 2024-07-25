import type {PropsWithChildren, ReactNode} from 'react'
import React, {useState} from 'react'
import {Stack} from '@mui/material'
import {Modal} from '../atoms/Modal'

export const ModalContainer: React.FC<PropsWithChildren<{ActionNode: ReactNode}>> = ({children, ActionNode}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = (open: boolean) => () => {
    setOpen(open)
  }

  return (
    <Stack>
      <Stack onClick={handleOpen(true)}>{ActionNode}</Stack>
      <Modal open={open} handleClose={handleOpen(false)}>
        {children}
      </Modal>
    </Stack>
  )
}
