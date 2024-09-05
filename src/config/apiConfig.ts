const API_BACKEND_URL = process.env.API_BACKEND_URL ?? 'http://127.0.0.1:1337'

export const apiConfig = {
  baseUrl: `${API_BACKEND_URL}/api`,
  assets: 'https://iot-echo-system.github.io/marketplace-assets/images/',
  cms: {
    siteInfo: '/site-info?populate=*',
    mainMenu: '/main-menu?populate=*',
    footer: '/footer?populate[sections][populate]=*&populate[socials][populate]=*',
    pageList: '/pages',
    officeLocation: '/office-location',
    productDetails: '/products?filters[slug][$eq]={productSlug}&populate=*',
    productsSummary:
      // eslint-disable-next-line max-len
      '/products?sort[0]=productId:asc&filters[categories][link][$eq]={category}&populate=*&pagination[pageSize]={pageSize}&pagination[page]={page}',
    pageDetails: '/pages?filters[slug][$eq]={slug}',
    contact: '/contacts',
    search: '/search',
    category: '/categories?filters[link][$eq]={category}',
    productsByIds: '/products?populate=featuredImage'
  },
  user: {
    users: '/users',
    register: '/auth/local/register',
    login: '/auth/local',
    changePassword: '/auth/reset-password',
    resetPassword: '/auth/update-password',
    forgetPassword: '/auth/forget-password',
    me: '/users/me?populate=*',
    userDetails: '/users/{id}?populate=*',
    address: '/addresses',
    orders: '/orders',
    order: '/orders?filters[id][$eq]={orderId}',
    orderDetails: '/orders/{orderId}?populate=*',
    verifyPayment: '/payments/verify',
    coupon: '/discount-coupons?filters[code][$eq]={code}'
  },
  shipping: {
    estimateDelivery: '/estimate-delivery',
    order: '/orders',
    baseUrl: '/shipping'
  },
  postal: {
    baseUrl: 'https://api.postalpincode.in',
    pinCode: '/pincode/{pinCode}',
    address: '/address'
  },
  seller: {
    baseUrl: '/seller',
    findAddress: '/address-by-sellers?filters[mobileNo][$eq]={mobileNo}',
    address: '/address-by-sellers',
    orders: '/orders',
    ordersFilter: '/orders/filter',
    order: '/orders/{orderId}'
  }
} as const
