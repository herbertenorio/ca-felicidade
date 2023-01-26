import { Request, Response } from "express";
import { AuthenthicateUser } from "../services/AuthenticateUser";


export class AuthenticateUserController {

    async handle(request: Request, response: Response) {

        const { email, password } = request.body;
        const authenticateUser = new AuthenthicateUser();
        const result = await authenticateUser.execute({ email, password });
        return response.json(result);

    }
}