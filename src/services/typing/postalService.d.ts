export type PostalAddress = {
  city: string
  district: string
  state: string
  pinCode: number
}

export type PostOffice = {
  Name: string
  Description: string | null
  BranchType: string
  DeliveryStatus: string
  Circle: string
  District: string
  Division: string
  Region: string
  Block: string
  State: string
  Country: string
  Pincode: string
}
export type AddressResponse = Array<{PostOffice: PostOffice[]; Status: string}>
