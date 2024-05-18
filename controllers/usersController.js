import User from "../models/userModels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { where } from "sequelize";

export const registerUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body
    
    console.log(req.body)
    if (password != confirmPassword) 
        return res.status(400).json({message: "Password dan Confirm Password not match"})

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            name: username,
            email: email,
            password: hashPassword
        });

        res.redirect('/login')
    } catch (err) {
        return res.status(500).json({message: `Error Found: ${err}`})
    }
}

export const login = async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body
    
    try {
        const user = await User.findOne({where: {email: email}})
        if(user == null || user == undefined) 
            return res.status(400).json({message: "Email Not Found!", link: "/register"})
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) 
            return res.status(400).json({message: "Password is wrong!"})        
        else {
            const accessToken = jwt.sign({name: user.name, email: user.email, pass: user.password}, 'secret');
            user.token = accessToken
            user.save()
            res.cookie("accessToken", accessToken, {
                httpOnly: true
            })

            res.redirect('/')
        }
    } catch (err) {
        return res.status(500).json({message: `Error Found: ${err}`})
    }
}