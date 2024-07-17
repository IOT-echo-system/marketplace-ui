import type {CarouselComponentNameMap, CarouselComponentNames} from '../../components/widgets/widgets'
import type {HeroBannerPropsType} from '../../components/widgets'

export type WidgetPropType<T = unknown> = { data: T, id: number }
// export type PageSummaryResponse = { slug: string; updatedAt: Date }
// export type PageListResponse = { data: Array<{ attributes: PageSummaryResponse }> }

export type AttributesResponseType = {
  slug: string
  // header: ContentHeader[]
  carousel: Array<{ __component: keyof typeof CarouselComponentNameMap } & Record<string, unknown>>
  // content: Content[]
  // ctaBanner: ContentCTABanner[]
  // seo: SEODetailsType | null
}

export type CarouselType = {
  widget: CarouselComponentNames
  data: HeroBannerPropsType
}

export type PageDetailsResponse = { data: Array<{ attributes: AttributesResponseType }> }
export type PageDetails = {
  carousel: CarouselType[]
}
