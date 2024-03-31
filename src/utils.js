import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { connectionString } from './db/connection.js';
import MongoStore from 'connect-mongo';

export const __dirname = dirname(fileURLToPath(import.meta.url));

import { hashSync, genSaltSync, compareSync } from 'bcrypt';

import { faker } from "@faker-js/faker";
faker.locale = "es";

import winston from 'winston';

// Hasheo de la contraseña con bcrypt para el registro de un usuario
export const createHash = (password) => {
    return hashSync(password, genSaltSync(10));
}

// Comparación de la contraseña que se ingresa en el login con la contraseña guardada en la ddbb
export const isValidPassword = (user, password) => {
    return compareSync(password, user.password);
}

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        ttl: 120,
        crypto: {
            secret: '1234'
        }
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000,
    },
};

export const generateProduct = () => {
    return {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.datatype.number({ max: 150 })
    }
}

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'gray',
        debug: 'white'
    }
}

const developmentLoggerConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.simple()
            )
        })
    ],
    levels: customLevels.levels
}

export const developmentLogger = winston.createLogger(developmentLoggerConfiguration);

export const addDevLogger = (req, res, next) => {
    req.logger = developmentLogger;
    next();
}

const productionLoggerConfiguration = {
    transports: [
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.simple()
            )
        })
    ],
    levels: customLevels.levels
}

export const productionLogger = winston.createLogger(productionLoggerConfiguration);

export const addProdLogger = (req, res, next) => {
    req.logger = productionLogger;
    next();
}