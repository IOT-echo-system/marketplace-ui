export const ComponentNameMap = {
  'text-content.text-content': 'TextContent',
  'text-with-cta.text-with-cta': 'TextWithCTA',
  'hero-banner.hero-banner': 'HeroBanner',
  'content-cards.content-cards': 'ContentCards'
} as const

export type ComponentKeyName = keyof typeof ComponentNameMap
export type ComponentName = (typeof ComponentNameMap)[ComponentKeyName]
