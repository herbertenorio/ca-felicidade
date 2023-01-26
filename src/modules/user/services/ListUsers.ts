import { PrismaClient } from "@prisma/client"

interface IUser {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    isAdmin: boolean
}

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

    async listUserById(userData: IUser) {

        const prisma = new PrismaClient()

        const user = await prisma.user.findMany({
            where: {
                id: userData.id
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