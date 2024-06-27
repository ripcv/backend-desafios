import userModel from "../dao/models/users.model.js";
import { isValidPassword } from "../utils.js";

export async function createUser(newUser) {
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

export async function findUser(username, password) {
    console.log("UserService")
    console.log(username)
    try {
        const user = await userModel.findOne({ email: username })

        if (!user) {
            return
        }
        if (!isValidPassword(user, password)) return false
        return user

    } catch (error) {
        return ("Error al vaidar usuario" + error)
    }
}


