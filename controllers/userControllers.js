import { request } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async(req, res) => {
    console.log("uyuyiuyiuyiuyiuyiuyiu");
    try {
        //const { name } = req.body;
        const user = await User.create(req.body);
        res.status(201).json({
            message: 'Usuario Creado',
            data: user
        });
    } catch (error) {
        console.log("exection")
        res.status(500).json({
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body; // desestructuracion
        const user = await User.findOne({email}); 
        if(!user){
            return res.status(404).json({
                message: "Usaurio no encontrado"
            });
        }

        const valid = await user.comparePassword(password);
        if(!valid){
            return res.status(404).json({
                message: "Usuario contrasena invalida"
            });
        }

        const token = jwt.sign(
            {
                id : user._id, 
                email: user.email,
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            success:true,
            token
        });


    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }
}