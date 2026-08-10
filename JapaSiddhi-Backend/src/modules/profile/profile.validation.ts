import { body } from 'express-validator';

export const updateProfileValidation = [

  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full Name is required')
    .isLength({
      min: 3,
      max: 150,
    })
    .withMessage(
      'Full Name must be between 3 and 150 characters',
    ),

  body('email')
    .optional({
      nullable: true,
    })
    .isEmail()
    .withMessage(
      'Invalid email address',
    ),

  body('gender')
    .optional({
      nullable: true,
    })
    .isIn([
      'Male',
      'Female',
      'Other',
      'Prefer Not To Say',
    ])
    .withMessage(
      'Invalid gender',
    ),

  body('dateOfBirth')
    .optional({
      nullable: true,
    })
    .isISO8601()
    .withMessage(
      'Date of Birth must be in YYYY-MM-DD format',
    ),

  body('countryId')
    .optional({
      nullable: true,
    })
    .isInt({
      min: 1,
    })
    .withMessage(
      'Invalid country',
    ),

  body('stateId')
    .optional({
      nullable: true,
    })
    .isInt({
      min: 1,
    })
    .withMessage(
      'Invalid state',
    ),

  body('cityId')
    .optional({
      nullable: true,
    })
    .isInt({
      min: 1,
    })
    .withMessage(
      'Invalid city',
    ),

  body('preferredLanguageId')
    .optional({
      nullable: true,
    })
    .isInt({
      min: 1,
    })
    .withMessage(
      'Invalid preferred language',
    ),

  body('profilePhoto')
    .optional({
      nullable: true,
    })
    .isString()
    .withMessage(
      'Invalid profile photo',
    ),

];