export interface UpdateProfileRequest {
  fullName: string;

  email?: string | null;

  gender?: string | null;

  dateOfBirth?: string | null;

  countryId?: number | null;

  stateId?: number | null;

  cityId?: number | null;

  preferredLanguageId?: number | null;

  profilePhoto?: string | null;
}

export interface ProfileResponse {
  id: number;

  firebaseUid: string;

  mobileNumber: string;

  fullName: string;

  email: string | null;

  gender: string | null;

  dateOfBirth: string | null;

  countryId: number | null;
  countryName: string | null;

  stateId: number | null;
  stateName: string | null;

  cityId: number | null;
  cityName: string | null;

  preferredLanguageId: number | null;
  preferredLanguageName: string | null;

  profilePhoto: string | null;

  profileCompleted: boolean;

  role: string;
}

export interface UpdateProfileResponse {
  success: boolean;

  profile: ProfileResponse;
}