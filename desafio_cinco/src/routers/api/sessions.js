import { Router } from 'express';
import User from '../../dao/models/users.model.js';
import Swal from 'sweetalert2'

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = new User({ first_name, last_name, email, age, password });
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = []
    try {
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
           user.email = email,
           user.first_name = "Admin"
           user.role = 'admin'
           user.password = password
        }else{
            user = await User.findOne({ email });
        }
        
        if (!user) {
            return res.render('login', { errorMessage: 'Usuario no encontrado' });
        }
        
        if(user.password === password){

            req.session.user = {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                role: user.role || ''
            };
            res.redirect('/api/products');
        }else{
            return res.render('login', { errorMessage: 'Contraseña Incorrecta' });
        }
        

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/');
    });
});

export default router;