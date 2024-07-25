import type {RTEPropsType} from '../molecules'
import type {TextWithCTADataType} from './TextWithCTA'
import {TextWithCTA} from './TextWithCTA'
import type {HeroBannerPropsType} from './HeroBanner'
import {HeroBanner} from './HeroBanner'
import {TextContent} from './TextContent'
import React from 'react'

export const ComponentMap = {
  'text-content.text-content': {
    component: TextContent,
    propType: {} as RTEPropsType
  },
  'text-with-cta.text-with-cta': {
    component: TextWithCTA,
    propType: {} as TextWithCTADataType
  },
  'hero-banner.hero-banner': {
    component: HeroBanner,
    propType: {} as HeroBannerPropsType
  }
} as const

export type ComponentKeyName = keyof typeof ComponentMap
export type WidgetPropType<T> = { data: T }
export type WidgetType<T extends ComponentKeyName> = { __component: T } & (typeof ComponentMap)[T]['propType']
export type PageDetailsType = {
  name: string
  slug: string
  carousel: Array<WidgetType<'hero-banner.hero-banner'>>
  header: Array<WidgetType<'hero-banner.hero-banner'>>
  content: Array<WidgetType<ComponentKeyName>>
  ctaBanner: Array<WidgetType<'text-with-cta.text-with-cta'>>
}
export type PageDetailsResponse = {
  data: Array<{ attributes: PageDetailsType }>
}

export const Widget = <K extends ComponentKeyName>({
  componentKey,
  data
}: {
  componentKey: K
  data: (typeof ComponentMap)[K]['propType']
}): React.JSX.Element => {
  const Component = ComponentMap[componentKey].component as React.FC<
    WidgetPropType<(typeof ComponentMap)[K]['propType']>
  >
  return <Component data={data}/>
}
