import userModel from "../dao/models/users.model.js";


  export  async  function createUser(newUser){
        try {
            let user = await userModel.findOne({ email: newUser.email })
            if (user) {
                console.log("El usuario ya existe")
                return
            }
             const result = await userModel.create(newUser)  
             return result

        } catch (error) {
            return ("Error al obtener el usuario" + error)
        }
    }

    export  async  function findUser(username){
        try {
            const user = await userModel.findOne({ email: username })
            if (!user) {
                console.log("El usuario no existe")
            }
            return user
           
        } catch (error) {
            return error
        }
    }


