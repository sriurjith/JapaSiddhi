import ENV from '../env';

export const API = {
  BASE_URL: ENV.API_URL,

  TIMEOUT: ENV.TIMEOUT,

  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_OTP: '/auth/verify-otp',

  HOME: '/home',
  PROFILE: '/profile',
};