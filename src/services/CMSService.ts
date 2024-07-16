import WebClient from 'web-client-starter'
import {apiConfig} from '../config/apiConfig'
import type {FooterInfo, SiteInfo, SiteStateType} from '../store/reducers'
import type {
  FooterResponse,
  MainMenuResponse,
  OfficeLocationResponse,
  PageDetails,
  PageDetailsResponse,
  PageListResponse,
  PageSummaryResponse,
  ProductResponse,
  SiteInfoResponse
} from './typing/CMSService'
import type {CategoryResponse, LocationPropsType} from '../components/molecules'
import type {TRootState} from '../typing/store'
import {rootState} from '../store'
import type {ProductDetails} from '../components/templates/products/Product'
import {HeaderComponentNameMap} from '../components/widgets/widgets'
import '../utils/extenstions'

class CMSService_ {
  private readonly config = apiConfig.cms
  private readonly baseUrl = apiConfig.baseUrl

  async getSiteInfoWithHeaderAndFooter(): Promise<SiteStateType> {
    const siteInfo = await this.getSiteInfo()
    const mainMenu = await this.getMainMenu()
    // const footer = await this.getFooter()
    return {siteInfo, header: {menus: mainMenu}, footer: rootState.site.footer}
  }

  async getSiteInfo(): Promise<SiteInfo> {
    const response = await WebClient.get<SiteInfoResponse>({
      baseUrl: this.baseUrl,
      path: this.config.siteInfo
    })
    return response.data.attributes
  }

  async getMainMenu(): Promise<MainMenuResponse[]> {
    return WebClient.get<MainMenuResponse[]>({
      baseUrl: this.baseUrl,
      path: this.config.mainMenu
    })
  }

  async getFooter(): Promise<FooterInfo> {
    const response = await WebClient.get<FooterResponse>({
      baseUrl: this.baseUrl,
      path: this.config.footer
    })
    return response.data.attributes
  }

  async getPageList(): Promise<PageSummaryResponse[]> {
    const response = await WebClient.get<PageListResponse>({
      baseUrl: this.baseUrl,
      path: this.config.pageList
    })
    return response.data.map(data => data.attributes)
  }

  async getOfficeLocation(): Promise<LocationPropsType> {
    const response = await WebClient.get<OfficeLocationResponse>({
      baseUrl: this.baseUrl,
      path: this.config.officeLocation
    })
    return response.data.attributes
  }

  async getPageContent(slug: string): Promise<PageDetails> {
    const response = await WebClient.get<PageDetailsResponse>({
      baseUrl: this.baseUrl,
      path: this.config.pageDetails,
      uriVariables: {slug}
    })
    // response.data[0]?.attributes?.ctaBanner.forEach(content => {
    //   content.widget = CTABannerComponentNameMap[content.__component]
    //   content.data = {...content}
    // })
    // response.data[0]?.attributes?.mainContent.forEach(content => {
    //   content.widget = ComponentNameMap[content.__component]
    //   content.data = {...content}
    // })
    response.data[0]?.attributes?.header.forEach(content => {
      content.widget = HeaderComponentNameMap[content.__component]
      content.data = {...content}
    })
    if (response.data.length === 0) {
      throw new Error('Data not found')
    }
    return response.data[0].attributes
  }

  async getInitialValue(): Promise<TRootState> {
    return {...rootState, site: await this.getSiteInfoWithHeaderAndFooter()}
  }

  async getProductDetails(productSlug: string): Promise<ProductDetails> {
    const response = await WebClient.get<ProductResponse>({
      baseUrl: this.baseUrl,
      path: this.config.productDetails,
      uriVariables: {productSlug}
    })
    return response.data[0].attributes
  }

  async getProductsByCategory(category: string, page: number): Promise<ProductResponse> {
    return WebClient.get<ProductResponse>({
      baseUrl: this.baseUrl,
      path: this.config.productsSummary,
      uriVariables: {category, page, pageSize: 36}
    })
  }

  async getCategory(category: string): Promise<CategoryResponse> {
    return WebClient.get<CategoryResponse>({
      baseUrl: this.baseUrl,
      path: this.config.category,
      uriVariables: {category}
    })
  }

  async getCartProducts(productIds: string[]): Promise<ProductDetails[]> {
    if (productIds.isEmpty()) {
      return new Promise(resolve => {
        resolve([])
      })
    }

    const query = productIds.map((productId, index) => `&filters[productId][$eq][${index}]=${productId}`).join('')
    const response = await WebClient.get<ProductResponse>({
      baseUrl: this.baseUrl,
      path: this.config.productsByIds + query
    })
    return response.data.map(({attributes}) => attributes)
  }
}

export const CMSService = new CMSService_()
