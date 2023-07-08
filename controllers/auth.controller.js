const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')

const getSignup = (req, res) =>{
    res.render('auth/signup')
}


const postSignup = async(req, res,next) =>{
 const {username,email,password,confirmpassword}=req.body;

 try {
    
    
 if(!username)
 {
    return res.render('auth/signup',{errorMessage:'El campo Username es requerido'})
 }
 if(!email)
 {
    return res.render('auth/signup',{errorMessage:'El campo Email es requerido'})
 }
 if(!password||!confirmpassword)
 {
    return res.render('auth/signup',{errorMessage:'El campo Password o Confirmpassword es requerido'})
 }

 if(password !== confirmpassword)
 {
    return res.render('auth/signup',{errorMessage:'Los Passwords no concuerdan intente nuevamente'})
 }

 const found = await User.findOne({ email });
 
 if(found) {
     return res.render('auth/signup', { errorMessage: 'El email ya fue registrado' } )
 }

 const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
 if (!regex.test(password)) {
     res
     .status(500)
     .render('auth/signup', { errorMessage: 'El password necesita tener al menos 6 caracteres y debe contener al menos, un numero, una letra minuscula y una mayuscula' });
     return;
 }

 const salt = bcrypt.genSaltSync(12);
 const encryptedPassword = bcrypt.hashSync(password, salt);

 const userCreated = await User.create({ email, username, password: encryptedPassword });
        const loggedUser = userCreated.toObject();
        delete loggedUser.password;

         req.session.currentUser = loggedUser;
        res.redirect(`/auth/profile`);       
 

 } catch (error) {
    
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
    } else {
        next(error);
    }
 }
}


const getProfile = async (req, res, next) => {
    try {
        const {username,email} = req.session.currentUser
        res.render('user/profile', { username,email })
    } catch (error) {
        next(error)
    }
}

const getLogin = (req, res) => {
    res.render('auth/login')
}

const postLogin = async (req, res, next) => {
console.log(req.session)
    const { email, password} = req.body;

    try {
        if(!email)
            return res.render('auth/login', { errorMessage: 'El campo Email es requerido' })
        if(!password)
            return res.render('auth/login', { errorMessage: 'El campo Password es requerido' })

        const user = await User.findOne({ email});
        if(!email) {
            return res.render('auth/login', { errorMessage: 'El Email o Password son incorrectos' })
        }
        // -> true | false
        const match = bcrypt.compareSync(password, user.password)
        console.log('match: ', match)
        if(match) { 
            const loggedUser = user.toObject();
            delete loggedUser.password; 
            // guardamos al user en el req.session
            req.session.currentUser = loggedUser;
            return res.redirect(`/auth/profile/`) 

           // return res.redirect(`/auth/signup`)
        }

        res.render('auth/login', { errorMessage: 'El Email o Password son incorrectos' })
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render('auth/signup', { errorMessage: error.message });
        } else {
            next(error);
        }    
    }
}


module.exports = {
    getSignup,
    postSignup,
    getProfile,
    getLogin,
    postLogin
}