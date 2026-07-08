import mongoose from 'mongoose'
import dotenv  from 'dotenv';
dotenv.config()
const connectdb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("conexion exitosa")  
    } catch (error) {
        console.log(error.message);
    }
}
export default connectdb;