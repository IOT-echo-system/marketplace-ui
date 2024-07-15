export const Config = {
  // eslint-disable-next-line no-process-env
  RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  LOGIN_PAGE_PATH: '/auth/login',
  HOME_PAGE_PATH: '/',
  SIGN_UP_PAGE_PATH: '/auth/signup',
  FORGOT_PASSWORD_PAGE_PATH: '/auth/forgot-password',
  PROFILE_PAGE_PATH: '/profiles',
  CART_PAGE_PATH: '/cart',
  CHECKOUT_PAGE_PATH: '/checkout',
  PAYMENT_PAGE_PATH: '/payment',
  ORDERS_PAGE_PATH: '/orders'
} as const
