import type {MenuLink, SiteInfo, FooterInfo} from '../../store/reducers/site'
import type {Content, ContentCTABanner, ContentHeader} from '../../components/widgets/widget'
import type {SEODetailsType} from '../../components/atoms'
import type {LocationPropsType} from '../../components/molecules'
import {ProductDetails} from '../../components/templates/products/Product'

export type SiteInfoResponse = {data: {attributes: SiteInfo}}
export type MainMenuResponse = {data: {attributes: {menuItems: MenuLink[]}}}
export type FooterResponse = {data: {attributes: FooterInfo}}
export type OfficeLocationResponse = {data: {attributes: LocationPropsType}}
export type PageSummaryResponse = {slug: string; updatedAt: Date}
export type PageListResponse = {data: Array<{attributes: PageSummaryResponse}>}
export type PageDetails = {
  slug: string
  header: ContentHeader[]
  mainContent: Content[]
  ctaBanner: ContentCTABanner[]
  seo: SEODetailsType | null
}
export type PageDetailsResponse = {data: Array<{attributes: PageDetails}>}
export type ProductDetailsResponse = {data: Array<{attributes: ProductDetails}>}
