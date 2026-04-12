import express from 'express';
import connectdb from './utils/db.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());

import userRoutes from './routes/user.route.js';


app.use('/api/user', userRoutes);


const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



connectdb();

