import {JwtUser} from '../modules/auth/auth.types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtUser;
  }
}

export {};
