const IS_PRODUCTION = false;

const DEV_API_URL = 'http://10.0.2.2:5000/api/v1';
const PROD_API_URL = 'https://api.japasiddhi.com/api';

const ENV = {
  APP_NAME: 'Japa Siddhi',

  VERSION: '1.0.0',

  API_URL: IS_PRODUCTION ? PROD_API_URL : DEV_API_URL,

  TIMEOUT: 30000,

  GOOGLE_MAP_KEY: '',

  RAZORPAY_KEY: '',

  APPLE_PAY_KEY: '',

  PLAYSTORE_URL: '',

  APPSTORE_URL: '',

  SUPPORT_EMAIL: 'support@japasiddhi.com',

  SUPPORT_PHONE: '',

  WEBSITE: '',

  DEFAULT_LANGUAGE: 'en',

  DEFAULT_COUNTRY: 'IN',
};

export default ENV;