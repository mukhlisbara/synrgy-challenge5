import jwt from 'jsonwebtoken'
import User from '../models/userModels.js';

export const authVerif = async (req, res, next) => {
    if (req.headers.cookie == undefined) {
        return res.redirect('/login')
    } 

    const token = req.headers.cookie.split("=")[1]
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            res.redirect('/login');
        }
        req.user = decoded;
        next();
    });
}

export default authVerif;