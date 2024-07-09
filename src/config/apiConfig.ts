const API_BASE_URL = process.env.API_BASE_URL ?? 'http://127.0.0.1:1337'

export const apiConfig = {
  baseUrl: `${API_BASE_URL}/api`,
  assets: 'https://iot-echo-system.github.io/marketplace-assets/images/',
  siteInfo: '/site-info?populate=*',
  mainMenu: '/main-menu?populate=*',
  footer: '/footer?populate=sections.navLinks,social.socials',
  pageList: '/pages',
  officeLocation: '/office-location',
  productDetails: '/products?filters[slug][$eq]={productSlug}&populate=*',
  pageDetails: '/pages?filters[slug][$eq]={slug}',
  contact: '/contacts'
} as const
