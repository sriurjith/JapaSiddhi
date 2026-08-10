import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface LoginRequest {
  phoneNumber: string;
}

export interface SendOTPResponse {
  success: boolean;
  confirmation?: FirebaseAuthTypes.ConfirmationResult;
  message?: string;
}

export interface VerifyOTPRequest {
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  idToken?: string;
  user?: FirebaseAuthTypes.User;
  message?: string;
}

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  firebaseToken: string | null;
  jwtToken: string | null;
  phoneNumber: string;
  confirmation: FirebaseAuthTypes.ConfirmationResult | null;
  user: FirebaseAuthTypes.User | null;
  error: string | null;
}