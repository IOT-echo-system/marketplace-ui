import type {PropsWithChildren} from 'react'
import React from 'react'
import {Backdrop, Box, Fade, Modal as MuiModal, styled} from '@mui/material'

type ModalProps = {open: boolean; handleClose: () => void}

const ModalContainer = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: theme.palette.background.paper,
  border: `2px solid ${theme.palette.grey[300]}`,
  borderRadius: '4px',
  boxShadow: theme.spacing(24),
  padding: theme.spacing(2),
  width: `calc(90% - ${theme.spacing(4)})`,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    width: `calc(80% - ${theme.spacing(8)})`
  },
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(67)
  }
}))

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({open, handleClose, children}) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{backdrop: Backdrop}}
      slotProps={{backdrop: {timeout: 500}}}
    >
      <Fade in={open}>
        <ModalContainer>{children}</ModalContainer>
      </Fade>
    </MuiModal>
  )
}
