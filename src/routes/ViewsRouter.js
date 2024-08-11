import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    if (!req.session.user) return res.redirect('/login')

    res.render('profile', { user: req.session.user });
});
router.get('/register', async (req, res) => {
    res.render('register')
});
router.get('/login', async (req, res) => {
    res.render('login')
})

export default router;