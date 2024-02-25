export const apiConfig = {
  baseUrl: 'http://localhost:3001/api',
  auth: {
    baseUrl: '/auth',
    signUp: '/sign-up',
    login: '/login',
    validate: '/validate',
    generateOTP: '/generate-otp',
    verifyOTP: '/verify-otp',
    resetPassword: '/reset-password'
  },
  account: {
    baseUrl: '/accounts',
    accounts: ''
  }
} as const
