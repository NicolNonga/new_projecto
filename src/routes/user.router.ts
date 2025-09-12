import { Router } from "express"
import { Request, Response } from "express";
const UserRoutes  = Router()

UserRoutes.get('/', (req:Request, res:Response) => {
    res.json({ message: 'User route is working!' });
    // ou
    // res.send('User route is working!');
});

export default UserRoutes;