import jwt from 'jsonwebtoken';

import 'dotenv/config';

export const PRIVATE_KEY = process.env.json_web_token_private_key;

export const generateToken = (user) => {
    const payload = {
        userId: user._id,
    };

    const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: '20m'
    });

    return token
}