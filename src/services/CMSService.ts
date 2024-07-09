import WebClient from 'web-client-starter'
import {apiConfig} from '../config/apiConfig'
import type {FooterInfo, MenuLink, SiteInfo, SiteStateType} from '../store/reducers/site'
import type {
  FooterResponse,
  MainMenuResponse,
  PageListResponse,
  PageSummaryResponse,
  SiteInfoResponse,
  OfficeLocationResponse,
  ProductDetailsResponse
} from './typing/CMSService'
import type {LocationPropsType} from '../components/molecules'
import type {ContactFormValuesType} from '../components/templates/ContactUs/useContactForm'
import type {TRootState} from '../typing/store'
import {rootState} from '../store'
import {ProductDetails} from '../components/templates/products/Product'

class CMSService_ {
  private readonly config = apiConfig

  async getSiteInfoWithHeaderAndFooter(): Promise<SiteStateType> {
    const siteInfo = await this.getSiteInfo()
    const mainMenu = await this.getMainMenu()
    // const footer = await this.getFooter()
    return {siteInfo, header: {menus: mainMenu}, footer: rootState.site.footer}
  }

  async getSiteInfo(): Promise<SiteInfo> {
    const response = await WebClient.get<SiteInfoResponse>({
      baseUrl: this.config.baseUrl,
      path: this.config.siteInfo
    })
    return response.data.attributes
  }

  async getMainMenu(): Promise<MenuLink[]> {
    const response = await WebClient.get<MainMenuResponse>({
      baseUrl: this.config.baseUrl,
      path: this.config.mainMenu
    })
    return response.data.attributes.menuItems
  }

  async getFooter(): Promise<FooterInfo> {
    const response = await WebClient.get<FooterResponse>({
      baseUrl: this.config.baseUrl,
      path: this.config.footer
    })
    return response.data.attributes
  }

  async getPageList(): Promise<PageSummaryResponse[]> {
    const response = await WebClient.get<PageListResponse>({
      baseUrl: this.config.baseUrl,
      path: this.config.pageList
    })
    return response.data.map(data => data.attributes)
  }

  async getOfficeLocation(): Promise<LocationPropsType> {
    const response = await WebClient.get<OfficeLocationResponse>({
      baseUrl: this.config.baseUrl,
      path: this.config.officeLocation
    })
    return response.data.attributes
  }

  async contact(values: ContactFormValuesType): Promise<string> {
    return await WebClient.post<string>({
      baseUrl: this.config.baseUrl,
      path: this.config.contact,
      body: {data: values}
    })
  }

  // async getPageContent(slug: string): Promise<PageDetails> {
  //   const response = await WebClient.get<PageDetailsResponse>({
  //     baseUrl: this.config.baseUrl,
  //     path: this.config.pageDetails,
  //     uriVariables: {slug}
  //   })
  //   response.data[0]?.attributes?.ctaBanner.forEach(content => {
  //     content.widget = CTABannerComponentNameMap[content.__component]
  //     content.data = {...content}
  //   })
  //   response.data[0]?.attributes?.mainContent.forEach(content => {
  //     content.widget = ComponentNameMap[content.__component]
  //     content.data = {...content}
  //   })
  //   response.data[0]?.attributes?.header.forEach(content => {
  //     content.widget = HeaderComponentNameMap[content.__component]
  //     content.data = {...content}
  //   })
  //   if (response.data.length === 0) {
  //     throw new Error('Data not found')
  //   }
  //   return response.data[0].attributes
  // }

  async getInitialValue(): Promise<TRootState> {
    return {site: await this.getSiteInfoWithHeaderAndFooter()}
  }

  async getProductDetails(productSlug: string): Promise<ProductDetails> {
    const response = await WebClient.get<ProductDetailsResponse>({
      baseUrl: this.config.baseUrl,
      path: this.config.productDetails,
      uriVariables: {productSlug}
    })
    return response.data[0].attributes
  }
}

export const CMSService = new CMSService_()
