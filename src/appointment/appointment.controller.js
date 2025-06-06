//Appointment controller

import Appointment from "./appointment.model.js"
import Patient from "../patient/patient.model.js"
import User from "../user/user.model.js"

export const createAppointment = async (req, res) => {
    try {
      const { patient, doctor, date, timeSlot, reason, notes } = req.body;
  
      const patientExists = await Patient.findById(patient);
      if (!patientExists) {
        return res.status(404).send({
          success: false,
          message: 'Patient not found'
        });
      }
  
     
      const doctorExists = await User.findById(doctor);
      if (!doctorExists) {
        return res.status(404).send({
          success: false,
          message: 'Doctor (ADMIN) not found'
        });
      }
  
     
      if (doctorExists.role !== 'ADMIN') {
        return res.status(403).send({
          success: false,
          message: 'User is not an ADMIN (Doctor role)'
        });
      }
  
      const existingAppointment = await Appointment.findOne({
        doctor: doctor,
        date: date,
        timeSlot: timeSlot,
        status: { $ne: 'cancelled' }  
      })
  
      if (existingAppointment) {
        return res.status(400).send({
          success: false,
          message: `The time slot ${timeSlot} on ${date} is already booked with this doctor.`
        })
      }
  
     
      const newAppointment = new Appointment({
        patient,
        doctor,
        date,
        timeSlot,
        reason,
        notes,
        status: 'scheduled'  
      })
  
      await newAppointment.save()
  
      return res.send({
        success: true,
        message: `Appointment for patient ${patient} with doctor ${doctor} created successfully on ${date} at ${timeSlot}`,
        appointment: newAppointment
      })
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        success: false,
        message: 'General error when creating appointment',
        error: err.message
      })
    }
  }


export const getAllAppointments = async (req, res) => {
    try {
      const { limit = 20, skip = 0, date, timeSlot, doctorId, patientId, status } = req.query;
  
     
      let filterConditions = {};
  
      
      if (date) {
        filterConditions.date = { $gte: new Date(date) };
      }
  
      
      if (timeSlot) {
        filterConditions.timeSlot = timeSlot;
      }
  
     
      if (doctorId) {
        filterConditions.doctor = doctorId;
      }
  
   
      if (patientId) {
        filterConditions.patient = patientId;
      }
  
      
      if (status) {
        filterConditions.status = status;
      }
  

      const appointments = await Appointment.find(filterConditions)
        .skip(skip) 
        .limit(limit) 
        .populate('patient', 'name surname')  
        .populate('doctor', 'name surname role')
        .sort({ date: 1 })
  
      if (appointments.length === 0) {
        return res.status(404).send({
          success: false,
          message: 'No appointments found'
        });
      }
  
      return res.send({
        success: true,
        appointments,
        total: appointments.length
      });
    } catch (err) {
      console.error('Error getting all appointments:', err);
      return res.status(500).send({
        success: false,
        message: 'Error fetching appointments',
        error: err.message
      });
    }
  };


  // Método para obtener una cita por ID
  export const getAppointment = async (req, res) => {
    try {
      const { id } = req.params
  
      
      const appointment = await Appointment.findById(id)
        .populate('patient', 'name surname') 
        .populate('doctor', 'name surname role')
  
      if (!appointment) {
        return res.status(404).send({
          success: false,
          message: 'Appointment not found'
        })
      }
  
      return res.send({
        success: true,
        appointment
      })
    } catch (err) {
      console.error('Error getting appointment:', err)
      return res.status(500).send({
        success: false,
        message: 'Error fetching appointment',
        error: err.message
      })
    }
  }
  
  // Método para obtener las citas filtradas por varios parámetros
export const getAppointmentsFiltered = async (req, res) => {
    try {
      const {
        date,
        timeSlot,
        doctorId,
        patientId,
        status = 'scheduled',  
      } = req.query
  
      let filterConditions = {}
  
      
      if (date) {
        filterConditions.date = { $gte: new Date(date) }  
      }
  
    
      if (timeSlot) {
        filterConditions.timeSlot = timeSlot
      }
  
      
      if (doctorId) {
        filterConditions.doctor = doctorId
      }
  
      if (patientId) {
        filterConditions.patient = patientId
      }
  
      
      if (status) {
        filterConditions.status = status
      }
  
      
      const appointments = await Appointment.find(filterConditions)
        .populate('patient', 'name surname')  
        .populate('doctor', 'name surname role')
        .sort({ date: 1 })
  
      if (appointments.length === 0) {
        return res.status(404).send({
          success: false,
          message: 'No appointments found with the provided filters'
        })
      }
  
      return res.send({
        success: true,
        appointments
      })
    } catch (err) {
      console.error('Error fetching filtered appointments:', err)
      return res.status(500).send({
        success: false,
        message: 'Error fetching appointments',
        error: err.message
      })
    }
  }

