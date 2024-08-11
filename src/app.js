import express from 'express';
import Handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import passport from 'passport';


import ViewsRouter from './routes/ViewsRouter.js';
import SessionsRouter from './routes/SessionsRouter.js';
import initializeStrategies from './config/passport.config.js';

import __dirname from './utils.js';


const app = express();
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://gonzalezclaudiofabian3:Luz1567842242@cluster0.obkcdqv.mongodb.net/clase_14n?retryWrites=true&w=majority",
        ttl: 30000
    }),
    resave: false,
    saveUnitialized: false,
    secret: 'anto'
}))

initializeStrategies();
app.use(passport.initialize());

const connection = mongoose.connect('mongodb+srv://gonzalezclaudiofabian3:Luz1567842242@cluster0.obkcdqv.mongodb.net/clase_14n?retryWrites=true&w=majority');


app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.engine('handlebars', Handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 8080;

app.use('/', ViewsRouter);
app.use('/api/sessions', SessionsRouter);


app.listen(PORT, () => console.log(`Listening PORT : ${PORT}`));