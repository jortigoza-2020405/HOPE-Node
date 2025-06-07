// Patient routes 
import { Router } from 'express'
import {
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    searchPatientByName,
    filterByBloodType,
    filterByDisease,
    filterByAllergy,
    filterByGender
} from './patient.controller.js'

import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { updatePatientValidator } from '../../helpers/validators.js'

const api = Router()

// Obtener todos los pacientes (ADMIN)
api.get(
    '/allPatients',
    [validateJwt, isAdmin],
    getAllPatients
)

// Obtener un paciente por ID
api.get(
    '/getOne/:id',
    [validateJwt],
    getPatientById
)

// Actualizar datos clínicos de un paciente
api.put(
    '/update/:id',
    [validateJwt, updatePatientValidator],
    updatePatient
)

// Eliminar paciente (desactivar status)
api.delete(
    '/delete/:id',
    [validateJwt],
    deletePatient
)

// Buscar pacientes por nombre o apellido
api.get(
    '/searchByName',
    [validateJwt],
    searchPatientByName
)

// Filtrar pacientes por tipo de sangre
api.get(
    '/filter/bloodType',
    [validateJwt],
    filterByBloodType
)

// Filtrar pacientes por enfermedad crónica
api.get(
    '/filter/disease',
    [validateJwt],
    filterByDisease
)

// Filtrar pacientes por alergia
api.get(
    '/filter/allergy',
    [validateJwt],
    filterByAllergy
)

// Filtrar pacientes por género
api.get(
    '/filter/gender',
    [validateJwt],
    filterByGender
)

export default api
