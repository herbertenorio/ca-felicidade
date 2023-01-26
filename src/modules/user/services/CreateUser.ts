import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

interface ICreateUser {
    firstName: string
    lastName: string
    email: string
    password: string
    isAdmin: boolean
}

export class CreateUser {

    async execute(userData: ICreateUser) {

        const prisma = new PrismaClient()

        const userExist = await prisma.user.findFirst({
            where: {
                email: {
                    contains: userData.email,
                    mode: "insensitive"
                }
            }
        })

        if (userExist) {
            throw new Error("User already exist in system")
        }

        const passwordHash = hash(userData.password, 10)

        userData.password = await passwordHash
        userData.email = userData.email.toLowerCase()

        //salvar usuário
        const user = await prisma.user.create({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            },
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: userData.password,
                email: userData.email
            }
        })

        return user;

    }

}