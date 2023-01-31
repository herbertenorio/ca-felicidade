import { PrismaClient } from "@prisma/client"

export class ListUsers {

    async listAll() {

        const prisma = new PrismaClient()

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

        const prisma = new PrismaClient()

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