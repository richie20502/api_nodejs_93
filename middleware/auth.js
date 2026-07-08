import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req,res,next) => {
    const authHader = req.headers.authorization;
    if(!authHader){
        return res.status(401).json({
            "message":"token no proporcionado"
        });
    }
    const token =  authHader.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            "message":"token invalido"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        res.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            "message":"token expirado o invalido "
        });
    }
    
}


export default auth;