import { Router } from "express";

const UserRoutes  = Router()

UserRoutes.get('/', (req, res) => {
    console.log('this just works');
    res.json({ message: 'User route is working!' });
    // ou
    // res.send('User route is working!');
});

export default UserRoutes;