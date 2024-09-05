import type {PropsWithChildren} from 'react'
import React from 'react'
import type {IconButtonProps} from '@mui/material'
import {Backdrop, Box, Fade, IconButton, Modal as MuiModal, styled} from '@mui/material'
import {Close} from '@mui/icons-material'

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

const CloseIcon = styled(IconButton)<IconButtonProps>(({theme}) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  background: theme.palette.error.main,
  padding: theme.spacing(0.5),
  color: theme.palette.common.white,
  '&:hover': {
    background: theme.palette.error.dark
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
        <ModalContainer>
          {children}
          <CloseIcon onClick={handleClose} size={'small'}>
            <Close fontSize={'small'} />
          </CloseIcon>
        </ModalContainer>
      </Fade>
    </MuiModal>
  )
}
