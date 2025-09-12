import { Request, Response } from "express";
import { LoginService } from "../services/authentication/loginService";
export class CreateUserController {
    constructor(private loginService: LoginService){

    }
   
   async handle(request: Request, response: Response):Promise<Response> {


         const {name , email } = request.body

         const loggedIn = await this.loginService.login({name, email})

         if(loggedIn)  return response.status(201).send({message: "User Criado com sucesso"})
        
            return response.status(401).send({message: "Usuario Nao entende"})
       
    }

} 