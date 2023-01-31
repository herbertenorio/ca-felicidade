import { Request, Response } from "express";
import { CreateUser } from "../services/CreateUser";
import { DeleteUser } from "../services/DeleteUser";
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

            const id = request.params.id
            const listUsers = new ListUsers();

            if (id) {
                result = await listUsers.listUserById(id);
            } else {
                result = await listUsers.listAll();
            }

            response.status(200).json(result);
            return

        }

        if (request.method == 'PUT') {

            const updateUser = new UpdateUser();

            if (userData) {

                userData.id = request.id_user_auth;
                result = await updateUser.execute(userData);

                response.status(200).json(result);
                return
            }

        }

        if (request.method == 'DELETE') {

            const id = request.params.id
            const deleteUser = new DeleteUser();

            if (id) {
                result = await deleteUser.execute(id, request.id_user_auth);
            } else {
                throw new Error("Id required")
            }

            response.status(200).json(result);
            return

        }

    }
}