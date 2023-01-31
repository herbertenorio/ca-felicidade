import { PrismaClient } from "@prisma/client"
import { request } from "http"
import { ListUsers } from "./ListUsers"

export class DeleteUser {

    async execute(idUserDelete: string, idUserAuth: string) {

        const prisma = new PrismaClient()

        const userAuth = await prisma.user.findFirst({
            where: {
                id: idUserAuth
            }
        })

        if (userAuth?.isAdmin) {

            const user = await prisma.user.delete({
                where: {
                    id: idUserDelete
                }
            })

            if (user) {
                return {
                    message: "User: " + user.firstName + ", with id: " + user.id + " deleted with success"
                }
            } else {
                throw new Error("User not exist in the system")
            }

        } else {
            throw new Error("Authenticated user is not admin. Operation not allowed")
        }

    }

}