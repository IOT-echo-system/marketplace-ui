import type {PropsWithChildren} from 'react'
import React from 'react'
import {Modal} from './Modal'
import type {FormPropsType} from './Form'
import {Form} from './Form'

type ModalFormPropsType = {open: boolean; handleClose: () => void} & FormPropsType

export const ModalForm: React.FC<PropsWithChildren<ModalFormPropsType>> = ({open, handleClose, ...props}) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <Form {...props} />
    </Modal>
  )
}
