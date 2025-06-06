// Validaciones con relacion entidad - base de datos
import User from '../src/user/user.model.js'

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email)=>{
    const alreadyEmail = await User.findOne({email}) 
        if(alreadyEmail){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existDPI = async (dpi = '') => {
  const exist = await User.findOne({ DPI: dpi })
  if (exist) throw new Error(`DPI already registered`)
}

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}

export const existDrug = async (id) => {
    const drug = await Pharmacy.findById(id)
    if (!drug) {
      console.error(`Drug with ID ${id} does not exist in Pharmacy`)
      throw new Error(`Drug with ID ${id} does not exist in Pharmacy`)
    }
    return true
}  

export const existMedicalHistory = async (id) => {
    const mh = await MedicalHistory.findById(id)
    if (!mh) {
      console.error(`MedicalHistory with ID ${id} does not exist`)
      throw new Error(`MedicalHistory with ID ${id} does not exist`)
    }
    return true
}

export const existUser = async (id) => {
    const user = await User.findById(id)
    if (!user) {
      console.error(`User con ID ${id} no existe`)
      throw new Error(`User con ID ${id} no existe`)
    }
    return true
}