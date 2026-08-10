import { admin } from '../../firebase/firebase';

import authRepository from './auth.repository';

import jwtService from '../../utils/jwt';

import AppError from '../../utils/appError';

import {
  FirebaseLoginRequest,
  CompleteProfileRequest,
  LoginResponse,
  AuthUser,
} from './auth.types';


class AuthService {

  async login(
    data: FirebaseLoginRequest,
    deviceInfo: {
      deviceType: 'ANDROID' | 'IOS';
      deviceModel?: string;
      deviceOs?: string;
      appVersion?: string;
    },
  ): Promise<LoginResponse> {

    let decodedToken;

    try {

      decodedToken =
        await admin.auth()
          .verifyIdToken(
            data.firebaseToken,
          );

    } catch (error) {

      throw new AppError(
        'Invalid Firebase token',
        401,
      );

    }


    const firebaseUid =
      decodedToken.uid;


    const phoneNumber =
      decodedToken.phone_number;


    if (!phoneNumber) {

      throw new AppError(
        'Phone number not found from Firebase',
        400,
      );

    }


    const mobileCountryCode =
      phoneNumber.substring(
        0,
        phoneNumber.length - 10,
      );


    const mobileNumber =
      phoneNumber.slice(-10);



    let user =
      await authRepository
        .findUserByFirebaseUid(
          firebaseUid,
        );



    if (!user) {

      const userId =
        await authRepository.createUser(
          {
            firebaseUid,

            mobileCountryCode,

            mobileNumber,

            deviceType:
              deviceInfo.deviceType,

            deviceModel:
              deviceInfo.deviceModel,

            deviceOs:
              deviceInfo.deviceOs,

            appVersion:
              deviceInfo.appVersion,

            firebaseToken:
              data.firebaseToken,
          },
        );


      user =
        await authRepository
          .findUserById(
            userId,
          );


      if (!user) {

        throw new AppError(
          'User creation failed',
          500,
        );

      }

    } else {


      await authRepository.updateLastLogin(
        user.id,

        data.firebaseToken,

        deviceInfo.deviceModel,

        deviceInfo.deviceOs,

        deviceInfo.appVersion,
      );


      user =
        await authRepository
          .findUserById(
            user.id,
          ) as AuthUser;

    }



    const token =
      jwtService.generate(
        {
          id: user.id,

          uuid: user.uuid,

          firebaseUid:
            user.firebaseUid,

          mobileNumber:
            user.mobileNumber,

          role:
            user.role,
        },
      );



    return {

      token,

      user,

    };

  }




  async completeProfile(
    userId: number,

    data: CompleteProfileRequest,

  ): Promise<void> {


    const user =
      await authRepository.findUserById(
        userId,
      );


    if (!user) {

      throw new AppError(
        'User not found',
        404,
      );

    }



    await authRepository.completeProfile(
      userId,

      {

        fullName:
          data.fullName,

        email:
          data.email,

        gender:
          data.gender,

        dateOfBirth:
          data.dateOfBirth,

        countryId:
          data.countryId,

        stateId:
          data.stateId ?? 0,

        cityId:
          data.cityId ?? 0,

        preferredLanguageId:
          data.preferredLanguageId,

        profilePhoto:
          data.profilePhoto,

      },

    );

  }



  async getProfile(
    userId: number,
  ): Promise<AuthUser> {


    const user =
      await authRepository.findUserById(
        userId,
      );


    if (!user) {

      throw new AppError(
        'User not found',
        404,
      );

    }


    return user;

  }

}


export default new AuthService();