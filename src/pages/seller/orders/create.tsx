import type {GetServerSideProps, NextPage} from 'next'
import {SellerWrapper} from '../../../components/templates/seller'
import {CMSService} from '../../../services'
import React, {useEffect} from 'react'
import {CreateSellerOrder} from '../../../components/templates/seller/CreateSellerOrder'
import {storage, StorageKeys} from '../../../utils/storage'
import type {Seller} from '../../../store/reducers/seller'
import {setCartInSeller} from '../../../store/actions/seller'
import {useDispatch, useSelector} from '../../../hooks'

const CreateOrderPage: NextPage = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.seller.cart)

  useEffect(() => {
    const cartInMemory = storage.getItem<Seller['cart']>(StorageKeys.SELLER_CART, cart)
    dispatch(setCartInSeller(cartInMemory))
  }, [])

  return (
    <SellerWrapper title={'Create order'}>
      <CreateSellerOrder />
    </SellerWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialValue = await CMSService.getInitialValue('background.default')
    return {props: {initialValue}}
  } catch (error) {
    return {props: {}}
  }
}

export default CreateOrderPage
