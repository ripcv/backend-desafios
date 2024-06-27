import userModel from "../dao/models/users.model.js";


class UserService {
    async createUser(newUser,username){
        console.log("Entrando  a Services")
        console.log(newUser)
        try {
            let user = await userModel.findOne({ email: username })
            if (user) {
                console.log("El usuario ya existe")
                return
            }
             const result = await userModel.create(newUser)  
             console.log("Servicio")
             console.log(result)
             return result

        } catch (error) {
            return ("Error al obtener el usuario" + error)
        }
    }

    async findUser(username){
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


}

export default new UserService