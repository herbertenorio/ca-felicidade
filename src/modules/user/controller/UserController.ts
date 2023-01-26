import { Request, Response } from "express";
import { CreateUser } from "../services/CreateUser";
import { ListUsers } from "../services/ListUsers";
import { UpdateUser } from "../services/UpdateUser";


export class UserController {

    async handle(request: Request, response: Response) {

        let result

        const userData = request.body

        if (request.method == 'POST') {

            const createUser = new CreateUser();
            result = await createUser.execute(userData);

            if (result) {
                response.status(201).json(result);
                return
            }

        }

        if (request.method == 'GET') {

            const listUsers = new ListUsers();

            if (!userData.id) {
                result = await listUsers.listAll();
            } else {
                result = await listUsers.listUserById(userData);
            }


            response.status(200).json(result);
            return

        }

        if (request.method == 'PUT') {

            const updateUser = new UpdateUser();

            if (userData) {

                userData.id = request.id_user;
                result = await updateUser.execute(userData);

                response.status(200).json(result);
                return
            }

        }

    }
}