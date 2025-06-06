// src/helpers/validators.js

import { body } from 'express-validator'
import { validateErrors } from './validate.error.js'
import {
  existEmail,
  existUsername,
  existDPI,
  existMedicalHistory,
  existUser,
  existDrug
} from './db.validators.js'

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

export const prescriptionValidator = [
  // medicalHistory: requerido, debe ser ObjectId válido y existir en MedicalHistory
  body('medicalHistory', 'medicalHistory es requerido')
    .notEmpty()
    .isMongoId()
    .withMessage('medicalHistory debe ser un ID válido')
    .bail()
    .custom(existMedicalHistory),

  // doctor: requerido, debe ser ObjectId válido y existir en User
  body('doctor', 'Doctor es requerido')
    .notEmpty()
    .isMongoId()
    .withMessage('doctor debe ser un ID válido')
    .bail()
    .custom(existUser),

  // medications: arreglo con al menos un elemento
  body('medications', 'Medications debe ser un arreglo con al menos un elemento')
    .isArray({ min: 1 }),

  // Para cada elemento de medications:
  body('medications.*.drug', 'Drug es requerido')
    .notEmpty()
    .isMongoId()
    .withMessage('Drug debe ser un ID válido')
    .bail()
    .custom(existDrug),

  body('medications.*.dosage', 'Dosage es requerido')
    .notEmpty()
    .isString()
    .withMessage('Dosage debe ser texto'),

  body('medications.*.frequency', 'Frequency es requerido')
    .notEmpty()
    .isString()
    .withMessage('Frequency debe ser texto'),

  body('medications.*.duration', 'Duration es requerido')
    .notEmpty()
    .isString()
    .withMessage('Duration debe ser texto'),

  body('medications.*.notes')
    .optional()
    .isString()
    .withMessage('Notes debe ser texto'),

  // notes (campo general) es opcional
  body('notes')
    .optional()
    .isString()
    .withMessage('Notes debe ser texto'),

  validateErrors
]
