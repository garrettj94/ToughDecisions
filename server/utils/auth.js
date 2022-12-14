const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});

// const secret = process.env.SESSION_SECRET
const secret = process.env.SESSION_SECRET || "sessionsecret";
const expiration = '30d';

module.exports = {
    authMiddleware: function ( { req }) {
        let token = req.body.token || req.query.token || req.header.authorization;

        if (req.headers.authorization) {
            const test = req.headers.authorization;
            token = test.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch(err) {
            console.log(err);
        }
        return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};