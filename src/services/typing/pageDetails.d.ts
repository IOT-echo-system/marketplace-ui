import type {ComponentKeyName, ComponentName} from '../../components/widgets/widgets'
import type * as widgets from '../../components/widgets'

type WidgetsType = Omit<typeof widgets, 'HeroBannerPropsType'>
export type WidgetType = keyof WidgetsType
export type WidgetPropType<T> = {data: T}
type WidgetParameterType = {[K in WidgetType]: Parameters<WidgetsType[K]>[0]}

export type AttributesResponseType = {
  slug: string
  carousel: Array<{__component: 'hero-banner.hero-banner'} & Record<string, unknown>>
  content: Array<{__component: ComponentKeyName} & Record<string, unknown>>
  header: Array<{__component: 'hero-banner.hero-banner'} & Record<string, unknown>>
  ctaBanner: Array<{__component: 'text-with-cta.text-with-cta'} & Record<string, unknown>>
}

export type WidgetDataType<T extends ComponentName> = {widget: T; data: WidgetParameterType[T]}

export type PageDetailsResponse = {data: Array<{attributes: AttributesResponseType}>}

export type PageDetails = {
  carousel: Array<WidgetDataType<'HeroBanner'>>
  content: Array<WidgetDataType<WidgetType>>
  header: Array<WidgetDataType<'HeroBanner'>>
  ctaBanner: Array<WidgetDataType<'TextWithCTA'>>
}
