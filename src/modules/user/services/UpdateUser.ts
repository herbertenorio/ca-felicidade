import { prisma } from "../../../InstanceDB"
import { hash } from "bcrypt"

interface IUpdateUserDTO {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    isAdmin: boolean
}

export class UpdateUser {

    async execute(userData: IUpdateUserDTO) {

        const userExist = await prisma.user.findFirst({
            where: {
                email: {
                    contains: userData.email,
                    mode: "insensitive"
                },
                id: {
                    not: userData.id
                }
            }
        })

        if (userExist) {
            throw new Error("Email already exist in system")
        }

        if (userData.password) {

            const passwordHash = hash(userData.password, 10)
            userData.password = await passwordHash

        }

        userData.email = userData.email.toLowerCase()

        const user = await prisma.user.update({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            },
            where: {
                id: userData.id
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