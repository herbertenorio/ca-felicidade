import { prisma, PrismaClient } from "@prisma/client"
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateUser {
    email: string
    password: string
}

export class AuthenthicateUser {

    async execute({ email, password }: IAuthenticateUser) {

        const prisma = new PrismaClient();
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    contains: email,
                    mode: "insensitive"
                }
            }
        })

        if (!user) {
            throw new Error("User or password invalid!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User or password invalid!");
        }

        const token = sign({ email }, "74b0328a08e7d9e213b1ea77ba32198d", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;


    }


}