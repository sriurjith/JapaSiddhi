

import { body } from 'express-validator';

export const loginValidation = [
  body('firebaseToken')
    .trim()
    .notEmpty()
    .withMessage('Firebase token is required.'),
];

export const completeProfileValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Full name must be between 3 and 100 characters.'),

  body('email')
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  body('gender')
    .notEmpty()
    .withMessage('Gender is required.')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Invalid gender.'),

  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required.')
    .isISO8601()
    .withMessage('Invalid date of birth.'),

  body('countryId')
    .notEmpty()
    .withMessage('Country is required.')
    .isInt({ min: 1 })
    .withMessage('Invalid country.'),

  body('stateId')
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage('Invalid state.'),

  body('cityId')
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage('Invalid city.'),

  body('preferredLanguageId')
    .notEmpty()
    .withMessage('Preferred language is required.')
    .isInt({ min: 1 })
    .withMessage('Invalid language.'),

  body('timezone')
    .optional({ nullable: true })
    .isLength({ max: 100 })
    .withMessage('Timezone is too long.'),

  body('deviceType')
    .optional({ nullable: true })
    .isLength({ max: 50 })
    .withMessage('Invalid device type.'),

  body('deviceModel')
    .optional({ nullable: true })
    .isLength({ max: 150 })
    .withMessage('Invalid device model.'),

  body('deviceOS')
    .optional({ nullable: true })
    .isLength({ max: 100 })
    .withMessage('Invalid device OS.'),

  body('appVersion')
    .optional({ nullable: true })
    .isLength({ max: 30 })
    .withMessage('Invalid app version.'),

  body('firebaseToken')
    .optional({ nullable: true })
    .isLength({ min: 10 })
    .withMessage('Invalid Firebase token.'),

  body('profilePhoto')
    .optional({ nullable: true })
    .isURL()
    .withMessage('Profile photo must be a valid URL.'),

  body('referralCode')
    .optional({ nullable: true })
    .isLength({ max: 30 })
    .withMessage('Referral code is too long.'),
];