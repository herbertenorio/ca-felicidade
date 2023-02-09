import { prisma } from "../../../../InstanceDB"
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { env } from "process";

interface IAuthenticateUser {
    email: string
    password: string
}

export class AuthenthicateUser {

    async execute({ email, password }: IAuthenticateUser) {

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

        const token = sign({ email }, env.SECRET_KEY as string, {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;


    }


}