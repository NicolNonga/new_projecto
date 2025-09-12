// import cors from "cors";
import express from "express";
import  dotenv from "dotenv"
import UserRoutes from "./routes/user.router";


const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())

// should enables cors 
app.use("",  UserRoutes)
// app.use(cors({
//     origin: process.env.FRONTEND_URL
// }))

app.listen(PORT, ()=>{
    console.log('Servidor Rodando')
})
