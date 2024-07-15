const API_BASE_URL = process.env.API_BASE_URL ?? 'http://127.0.0.1:1337'

export const apiConfig = {
  baseUrl: `${API_BASE_URL}/api`,
  assets: 'https://iot-echo-system.github.io/marketplace-assets/images/',
  cms: {
    siteInfo: '/site-info?populate=*',
    mainMenu: '/main-menu?populate=*',
    footer: '/footer?populate=sections.navLinks,social.socials',
    pageList: '/pages',
    officeLocation: '/office-location',
    productDetails: '/products?filters[slug][$eq]={productSlug}&populate=*',
    productsSummary:
      // eslint-disable-next-line max-len
      '/products?sort[0]=productId:asc&filters[categories][link][$eq]={category}&populate=*&pagination[pageSize]={pageSize}&pagination[page]={page}',
    pageDetails: '/pages?filters[slug][$eq]={slug}',
    contact: '/contacts',
    category: '/categories?filters[link][$eq]={category}',
    productsByIds: '/products?populate=featuredImage'
  },
  user: {
    users: '/users',
    register: '/auth/local/register',
    login: '/auth/local',
    me: '/users/me',
    address: '/addresses',
    order: '/orders',
    orderDetails: '/orders/{orderId}?populate=*',
    verifyPayment: '/payments/verify'
  }
} as const
