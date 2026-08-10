import auth, {
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

export interface SendOtpResponse {
  success: boolean;
  confirmation?: FirebaseAuthTypes.ConfirmationResult;
  message?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  user?: FirebaseAuthTypes.User;
  idToken?: string;
  message?: string;
}

class FirebaseAuthService {
  async sendOTP(
    phoneNumber: string,
  ): Promise<SendOtpResponse> {
    try {
      const confirmation =
        await auth().signInWithPhoneNumber(phoneNumber);

      return {
        success: true,
        confirmation,
      };
    } catch (error: any) {
      console.log('Send OTP Error:', error);

      return {
        success: false,
        message:
          error?.message ??
          'Unable to send OTP.',
      };
    }
  }

  async verifyOTP(
    confirmation: FirebaseAuthTypes.ConfirmationResult,
    otp: string,
  ): Promise<VerifyOtpResponse> {
    try {
      const credential =
        await confirmation.confirm(otp);

      if (!credential || !credential.user) {
        return {
          success: false,
          message: 'OTP verification failed.',
        };
      }

      const idToken =
        await credential.user.getIdToken(true);

      return {
        success: true,
        user: credential.user,
        idToken,
      };
    } catch (error: any) {
      console.log('Verify OTP Error:', error);

      return {
        success: false,
        message:
          error?.message ??
          'Invalid OTP.',
      };
    }
  }

  getCurrentUser():
    | FirebaseAuthTypes.User
    | null {
    return auth().currentUser;
  }

  async refreshToken(): Promise<string | null> {
    try {
      const user = auth().currentUser;

      if (!user) {
        return null;
      }

      return await user.getIdToken(true);
    } catch (error) {
      console.log('Refresh Token Error:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    await auth().signOut();
  }
}

export default new FirebaseAuthService();