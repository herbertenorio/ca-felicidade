import { prisma } from "../../../InstanceDB"

export class DeleteUser {

    async execute(idUserDelete: string, idUserAuth: string) {

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