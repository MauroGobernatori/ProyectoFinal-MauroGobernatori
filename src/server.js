import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { __dirname, mongoStoreOptions } from './utils.js';
import { errorHandler } from "./middlewares/errorHandler.js";

import { initMongoDB } from './db/connection.js';

import 'dotenv/config';

import MainRouter from './routes/mainRouter.js';

import passport from 'passport';
import './passport/localPassport.js';
import './passport/githubPassport.js';
import './passport/jwtPassport.js';

import { developmentLogger, productionLogger, addDevLogger, addProdLogger } from './utils.js';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { info } from './docs/info.js';

const app = express();
const mainRouter = new MainRouter();

const specs = swaggerJSDoc(info);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname+ '/static'));

// -----------------------------------------------------  //
// -----------------------------------------------------  //
//                 Handlebars Helpers                     //
const hbsHelper = handlebars.create({
    helpers: {
        equals: function(v1, v2) { return v1==v2; }
    }
})

app.engine('handlebars', hbsHelper.engine);
// -----------------------------------------------------  //
// -----------------------------------------------------  //


// -----------------------------------------------------  //
//              SETTING OF THE VIEWS                      //
// app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
// -----------------------------------------------------  //

app.use(cookieParser());

//     TABLE OF ACTIVE SESSIONS IN THE MONGO DATABASE     //
app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(addDevLogger);

app.use('', mainRouter.getRouter());

app.use(errorHandler);

// -----------------------------------------------------  //
//  CONNECTION TO THE DATABASE AND RUNNING OF THE SERVER  //
// -----------------------------------------------------  //
const persistence = process.env.PERSISTENCE;

if(persistence == 'MONGO'){
    await initMongoDB();
}

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    developmentLogger.info(`Server running on port ${PORT}`);
    // console.log(`Server running on port ${PORT}`)
});