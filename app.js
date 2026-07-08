import express from 'express';
import dotenv  from 'dotenv';
import userRoutes from './routes/user.js';
import connectdb from './config/databases.js';

connectdb();

const app = express()
dotenv.config()

app.get('/',(req, res) =>  {
    res.send('hola mundo');
});

app.use(express.json())

app.use('/api/users', userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`escucha desde el puerto ${PORT}`)
});