import express from 'express'
const route = express.Router();
import { createUser,login } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';

route.post('/', createUser);
route.post('/login', login);
route.get('/prueba', auth ,function(requ, resp){
    return resp.status(200).json({
                message: "Todo valido"
            });
});

export default route;