import type {CarouselComponentNameMap} from './widgets'

// type WidgetType = (typeof ComponentMap)[keyof typeof ComponentMap]
// export type WidgetPropType<T = unknown> = { data: T }
// export type Content = { widget: WidgetType; __component: keyof typeof ComponentNameMap } & WidgetPropType<
//   typeof Content.widget
// >
//
// export type ContentCTABanner = {
//   widget: WidgetType
//   __component: keyof typeof CTABannerComponentNameMap
// } & WidgetPropType<typeof Content.widget>
//
// export type ContentHeader = { widget: WidgetType; __component: keyof typeof HeaderComponentNameMap } & WidgetPropType<
//   typeof Content.widget
// >

export type CarouselResponseType = {__component: keyof typeof CarouselComponentNameMap} & Record<string, unknown>
