//MedicalHistory routes

import { Router } from 'express'

import {
    createMedicalHistory,
    getAllMedicalHistories,
    getMedicalHistory,
    updateMedicalHistory
} from './medicalHistory.controller.js'

import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { medicalHistoryValidator } from '../../helpers/validators.js'

const api = Router()

api.post(
    '/createMedicalHistory',
    [validateJwt, isAdmin, medicalHistoryValidator],
    createMedicalHistory
)

api.get(
    '/getAllMedicalHistories',
    [validateJwt, isAdmin],
    getAllMedicalHistories
)

api.get(
    '/getMedicalHistoryById/:id',
    [validateJwt, isAdmin],
    getMedicalHistory
)

api.put(
    '/updateMedicalHistory/:id',
    [validateJwt, isAdmin],
    updateMedicalHistory
)




export default api