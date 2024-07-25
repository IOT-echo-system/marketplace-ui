import type {NextApiRequest, NextApiResponse} from 'next'
import type {AddressResponse, PostalAddress} from '../../services/typing/postalService'
import WebClient from 'web-client-starter/lib'
import {apiConfig} from '../../config/apiConfig'

export default async (req: NextApiRequest, res: NextApiResponse<PostalAddress | {error: string}>): Promise<void> => {
  const {pinCode} = req.query

  if (!pinCode || typeof pinCode !== 'string') {
    res.status(400).json({error: 'Pin code is required'})
    return
  }

  try {
    const response = await WebClient.get<AddressResponse>({
      baseUrl: apiConfig.postal.baseUrl,
      path: apiConfig.postal.pinCode,
      uriVariables: {pinCode}
    })

    if (response[0].Status === 'Success') {
      const {PostOffice} = response[0]
      const {District, State, Block, Pincode} = PostOffice[0]
      res.status(200).json({
        city: Block,
        district: District,
        state: State,
        pinCode: +Pincode
      })
    } else {
      res.status(404).json({error: 'Invalid Pin Code'})
    }
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
}
