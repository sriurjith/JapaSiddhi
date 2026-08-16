export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OtpScreen: {
    phoneNumber: string;
    confirmation?: unknown;
    mobileCountryCode?: string;
    mobileNumber?: string;
    email?: string;
    sentTo?: string;
  };
  CompleteProfile: {
    phoneNumber?: string;
    email?: string;
    mobileCountryCode?: string;
    mobileNumber?: string;
  };
  Home: undefined;
  Chant: undefined;
  FamilyJapa: undefined;
  Donate: undefined;
  Festivals: undefined;
  Progress: undefined;
  Profile: undefined;
  BanaLingam: undefined;
  NithyaHomam: undefined;
  Orders: undefined;
  CustomerCare: undefined;
  Notifications: undefined;
  Feedback: undefined;
};
