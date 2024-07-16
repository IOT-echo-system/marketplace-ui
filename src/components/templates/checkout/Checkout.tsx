import React from 'react'
import {BoxedContainer, Button, Link} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import {DynamicAccordionList} from '../../molecules'
import {Modal} from '../../atoms/Modal'
import {CheckCircleOutlined, HighlightOff} from '@mui/icons-material'
import {Config} from '../../../config'
import {useCheckout} from './useCheckout'

export type CheckoutStatePropsType = {onSuccess: () => void}

export const Checkout: React.FC = () => {
  const {state, accordionList, handleChange, handleClose, orderStatus} = useCheckout()

  return (
    <BoxedContainer pt={2} pb={2}>
      <Stack bgcolor={'background.paper'} p={2} spacing={2}>
        <Typography variant={'h5'} component={'h1'}>
          Checkout
        </Typography>
        <DynamicAccordionList accordions={accordionList} expandAccordion={state} onChange={handleChange} />
      </Stack>
      <Modal open={orderStatus === 'SUCCESS' || orderStatus === 'FAIL'} handleClose={handleClose}>
        <Stack>
          <Stack spacing={4}>
            <Typography variant={'h4'} textAlign={'center'}>
              Order status
            </Typography>
            {orderStatus === 'SUCCESS' && (
              <Stack alignItems={'center'}>
                <CheckCircleOutlined color={'success'} sx={{fontSize: '12rem'}} />
                <Typography>Your order placed successfully!!</Typography>
              </Stack>
            )}
            {orderStatus === 'FAIL' && (
              <Stack alignItems={'center'}>
                <HighlightOff color={'error'} sx={{fontSize: '12rem'}} />
                <Typography>Oops! Your order is not placed!!</Typography>
              </Stack>
            )}
          </Stack>
          <Stack
            direction={'row'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            spacing={2}
            sx={{'&  *': {marginTop: '1rem'}}}
          >
            <Link href={Config.HOME_PAGE_PATH} onClick={handleClose}>
              <Button variant={'contained'}>Continue shopping</Button>
            </Link>
            <Link href={Config.ORDERS_PAGE_PATH} onClick={handleClose}>
              <Button variant={'contained'}>View order</Button>
            </Link>
          </Stack>
        </Stack>
      </Modal>
    </BoxedContainer>
  )
}
