import usersService from "../services/usersService.js";

class UsersControllers{

    async registerUser(req,res, next){
        res.redirect('/login')
    }

}


export default new UsersControllers