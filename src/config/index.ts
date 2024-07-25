export const Config = {
  // eslint-disable-next-line no-process-env,@typescript-eslint/no-non-null-assertion
  RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  LOGIN_PAGE_PATH: '/profile/login',
  PRODUCT_PAGE_PATH: '/products',
  HOME_PAGE_PATH: '/',
  SIGN_UP_PAGE_PATH: '/profile/signup',
  FORGOT_PASSWORD_PAGE_PATH: '/profile/forgot-password',
  MY_ACCOUNT_PAGE_PATH: '/profile',
  RESET_PASSWORD_PAGE_PATH: '/profile/reset-password',
  ADDRESS_BOOK_PAGE_PATH: '/profile/address',
  WISHLIST_PAGE_PATH: '/profile/wishlist',
  CART_PAGE_PATH: '/cart',
  CHECKOUT_PAGE_PATH: '/cart/checkout',
  ORDERS_PAGE_PATH: '/profile/orders',
  REWARDS_PAGE_PATH: '/profile/rewards',
  SELLER_DASHBOARD_PAGE_PATH: '/seller',
  SELLER_INVOICES_PAGE_PATH: '/seller/invoices',
  SELLER_INVOICES_CREATE_PAGE_PATH: '/seller/invoices/create'
} as const
