export const ComponentNameMap = {
  'text-content.text-content': 'TextContent',
  'text-with-cta.text-with-cta': 'TextWithCTA',
  'content-cards.content-cards': 'ContentCards'
}

export const CTABannerComponentNameMap = {
  'text-with-cta.text-with-cta': 'TextWithCTA'
}

export const HeaderComponentNameMap = {
  'hero-banner.hero-banner': 'HeroBanner'
}

export const CarouselComponentNameMap = {
  'hero-banner.hero-banner': 'HeroBanner',
  'text-with-cta.text-with-cta': 'TextWithCTA'
} as const

export type CarouselComponentNames = (typeof CarouselComponentNameMap)[keyof typeof CarouselComponentNameMap]
