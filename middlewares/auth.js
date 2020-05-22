const jwt = require('jsonwebtoken');
//const Candidat = require('../models/Candidat');
// const Zach = require('../models/Zach');

module.exports = async (req, res, next) => {
 
// Getting token of the user who wants to login
const token = req.headers.authorization;
    if(!token) return res.status(401).send('Auth Error');

    try {
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('Invalid Token');
    }
};