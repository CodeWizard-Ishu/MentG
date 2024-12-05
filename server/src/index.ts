import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import router from './routes/route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) => {
    res.json({
        health : "100%",
        state : "running"
    });
})

app.use('/',router);

app.listen(3000, ()=>{
    console.log(`Server Running on Port 3000`);
})