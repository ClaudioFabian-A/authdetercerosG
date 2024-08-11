
import { Router } from "express";
import passport from "passport";


const router = Router();



router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/authFail', failureMessage: true }), async (req, res) => {
    res.send({ status: "success", payload: req.user._id })
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/authFail', failureMessage: true }), async (req, res) => {
    //el usuario llega como 'req.user', lo genera automaticamente
    req.session.user = req.user;
    res.send({ status: "success", message: "Logueado" })
});

router.get('/authFail', (req, res) => {
    console.log(req.session.message);
    res.status(401).send({ status: 'error', error: "Error de autenticacion" })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.redirect('/');
        } else {
            redirect('/')
        }
    })
})

export default router;