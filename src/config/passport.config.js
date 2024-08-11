import passport from "passport";
import local from "passport-local";
import UserManager from "../dao/Mongo/managers/UserManager.js";
import auth from "../services/auth.js";


//estrategia local = registro y login
const LocalStrategy = local.Strategy; //Local = userName + passport
const userService = new UserManager();

const initializeStrategies = () => {
    //1¿que estrategias tengo instaladas?
    //passport odia todo lo que no sea username, por eso lo modificamos con le 'usernameField: 'email'(tiene que coincidir con el 'name' del imput)
    //se introduce un 'done' equivalente a un 'next' de un middleware corriente
    //para traer mas informacion ademas de email y password, usamos "passReqTuCallback:true"
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        //passport extrae automaticamente 2 variables, 'email y password' , si no las puede extraer no funciona
        //finalemante introducimos la logica de registro
        const {
            firstName,
            lastName,
            age,
        } = req.body;
        if (!firstName || !lastName || !email || !password) return done(null, false, { message: "Incomplete values" })


        const hasheadPassword = await auth.createHash(password);

        const newUser = {
            firstName,
            lastName,
            email,
            age,
            password: hasheadPassword
        }
        const result = await userService.create(newUser);
        //si salio bien devuelve el req.user
        done(null, result)

    }))


    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {

        if (!email || !password) return done(null, false, { message: 'Incompleta values' })
        const user = await userService.getBy({ email });
        if (!user) return done(null, false, { message: 'Incorrect Credentials' })
        const isValidPassword = await auth.validatePassword(password, user.password);
        if (!isValidPassword) return done(null, false, { message: 'Incorrect Credentials' })

        //done devuelve al usuario
        done(null, user)


    }));



    //funciones reservadas de Passport
    // son necesarias para que funcione passport

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userService.getBy({ _id: id });
        done(null, user)

    });



}

export default initializeStrategies;