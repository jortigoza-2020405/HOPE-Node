//Diagnosis routes

import { Router } from 'express'

import {
    createDiagnosis,
    getAllDiagnoses,
    getDiagnosis,
    updateDiagnosis
} from './diagnosis.controller.js'

import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

//Crear un diagnóstico (Solo Doctores/Admins)

api.post(
    '/createDiagnosis',
    [validateJwt,isAdmin],
    createDiagnosis
)

api.get(
    '/getAllDiagnosis',
    [validateJwt, isAdmin],
    getAllDiagnoses
)

// Obtener un diagnóstico por id
api.get(
    '/getDiagnosis/id/:id',
    [validateJwt, isAdmin],
    getDiagnosis
);

// Obtener un diagnóstico por code
api.get(
    '/getDiagnosis/code/:code',
    [validateJwt, isAdmin],
    getDiagnosis
);

// Obtener un diagnóstico por name
api.get(
    '/getDiagnosis/name/:name',
    [validateJwt, isAdmin],
    getDiagnosis
);

api.put(
    '/updateDiagnosis/:id',
    [validateJwt, isAdmin],
    updateDiagnosis
)

export default api