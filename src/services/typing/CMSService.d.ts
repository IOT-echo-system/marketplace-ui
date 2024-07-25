import type {FooterInfo, MenuLink, SiteInfo} from '../../store/reducers'
import type {LocationPropsType} from '../../components/molecules'
import type {ProductDetails} from '../../components/templates/products/Product'

export type ProductResponse = {data: Array<{attributes: ProductDetails}>; meta: MetaResponseType}
export type MetaResponseType = {pagination: {page: number; pageSize: number; pageCount: number; total: number}}
export type SiteInfoResponse = {data: {attributes: SiteInfo}}
export type MainMenuResponse = MenuLink & {children?: MainMenuResponse[]}
export type FooterResponse = {data: {attributes: FooterInfo}}
export type OfficeLocationResponse = {data: {attributes: LocationPropsType}}

export type PageSummary = {title: string; slug: string}
export type PageListResponse = {data: Array<{attributes: PageSummary}>; meta: MetaResponseType}
