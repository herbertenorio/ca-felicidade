import { AuthenthicateUser } from "../services/AuthenticateUser";
import { MockContext, Context, createMockContext } from "../../../../config/test/context";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

interface IAuthenticateUser {
    email: string
    password: string
}

async function execute({ email, password }: IAuthenticateUser) {

    const user = await ctx.prisma.user.findFirst({
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

    //encrypt senha
    const passwordHash = hash(user.password, 10)
    user.password = await passwordHash

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

describe("Authentication user", () => {

    it("Should return user token", async () => {

        const user = {
            "id": "54545151511",
            "firstName": "Fulano",
            "lastName": "de Tal",
            "email": "fulaninho@gmail.com",
            "password": "123456",
            "isAdmin": false
        }

        const email = user.email
        const password = user.password

        mockCtx.prisma.user.findFirst.mockResolvedValue(user)

        const token = await execute({ email, password })

        expect(token).toHaveReturned
    });

});