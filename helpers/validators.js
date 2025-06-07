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

export const updatePatientValidator = [
  body('birthDate', 'Invalid birth date')
    .optional()
    .isDate(),
  body('gender', 'Invalid gender')
    .optional()
    .isIn(['MALE', 'FEMALE']),
  body('address', 'Address must be less than 100 characters')
    .optional()
    .isLength({ max: 100 }),
  body('bloodType', 'Invalid blood type')
    .optional()
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  validateErrors
]

export const addMedicineValidator = [
  body('name', 'Medicine name cannot be empty')
    .notEmpty()
    .custom(existMedicineName),
  body('description', 'Description cannot be empty')
    .notEmpty(),
  body('expirationDate', 'Expiration date must be a valid date')
    .notEmpty()
    .isISO8601()
    .toDate(),
  body('stock', 'Stock must be a number greater than or equal to 0')
    .notEmpty()
    .isInt({ min: 0 }),
  body('provider', 'Provider name cannot be empty')
    .notEmpty(),
  validateErrors
]

export const updateMedicineValidator = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Name must not be empty if provided'),

  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description must not be empty if provided'),

  body('expirationDate')
    .optional()
    .isISO8601()
    .withMessage('Expiration date must be valid'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative number'),

  body('provider')
    .optional()
    .notEmpty()
    .withMessage('Provider must not be empty if provided'),

  validateErrors
]