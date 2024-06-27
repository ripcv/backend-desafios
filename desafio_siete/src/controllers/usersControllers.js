import * as UserService from "../services/usersService.js"

export  async  function createUser(newUser){
        try {
            const result = await UserService.createUser(newUser)
            return result
        } catch (error) {
            return res.redirect('failregister')
        }
    }

