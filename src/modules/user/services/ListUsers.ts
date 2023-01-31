import { prisma } from "../../../InstanceDB"

export class ListUsers {

    async listAll() {

        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        })


        return users;
    }

    async listUserById(id: string) {

        const user = await prisma.user.findMany({
            where: {
                id: id
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        })

        return user;
    }

}