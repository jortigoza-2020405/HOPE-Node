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

export const existMedicineName = async (name = '') => {
  const exists = await Pharmacy.findOne({ name })
    if (exists) throw new Error(`Medicine ${name} already exists`)
}