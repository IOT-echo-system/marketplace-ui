const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:1337'

export const apiConfig = {
  baseUrl: `${API_BASE_URL}/api`,
  assets: "https://iot-echo-system.github.io/marketplace-assets/images/",
  siteInfo: '/site-info?populate[seo][populate][0]=metaImage',
  mainMenu: '/main-menu?populate=*',
  footer: '/footer?populate=sections.navLinks,social.socials',
  pageList: '/pages',
  officeLocation: '/office-location',
  productDetails: '/products?filters[slug][$eq]={productSlug}&populate=*',
  contact: '/contacts'
} as const
