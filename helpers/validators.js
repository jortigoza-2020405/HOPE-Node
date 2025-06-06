// validaciones de modelos
import { body } from 'express-validator'
import { validateErrors } from './validate.error.js'
import { existEmail, existUsername, existDPI } from './db.validators.js'

export const registerPatientValidator = [
  body('name', 'Name cannot be empty').notEmpty(),
  body('surname', 'Surname cannot be empty').notEmpty(),
  body('DPI', 'DPI must be a valid 13-digit number')
    .notEmpty()
    .isLength({ min: 13, max: 13 })
    .isNumeric()
    .custom(existDPI),
  body('email', 'Email cannot be empty or is not a valid email')
    .notEmpty()
    .isEmail()
    .custom(existEmail),
  body('username', 'Username cannot be empty')
    .notEmpty()
    .toLowerCase()
    .custom(existUsername),
  body('password', 'Password must be strong and at least 8 characters')
    .notEmpty()
    .isLength({ min: 8 })
    .isStrongPassword(),
  body('birthDate', 'Birth date is required').notEmpty().isDate(),
  body('gender', 'Gender is required and must be valid')
    .notEmpty()
    .isIn(['MALE', 'FEMALE']),
  body('bloodType', 'Blood type is required')
    .notEmpty()
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  validateErrors
]

export const loginValidatorPatient = [
  body('email', 'Email cannot be empty').notEmpty().isEmail(),
  body('password', 'Password must be strong and at least 8 characters')
    .notEmpty()
    .isLength({ min: 8 })
    .isStrongPassword(),
  validateErrors
]

export const loginValidator = [
  body('userLoggin', 'Username or email cannot be empty')
    .notEmpty()
    .toLowerCase(),
  body('password', 'Password must be strong and at least 8 characters')
    .notEmpty()
    .isLength({ min: 8 })
    .isStrongPassword(),
  validateErrors
]
