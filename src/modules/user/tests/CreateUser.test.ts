import { MockContext, Context, createMockContext } from "../../../config/test/context";

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

interface ICreateUser {
    firstName: string
    lastName: string
    email: string
    password: string
    isAdmin: boolean
}

export async function findUserByEmail(email: string, ctx: Context) {

    const userExist = await ctx.prisma.user.findFirst({
        where: {
            email: {
                contains: email,
                mode: "insensitive"
            }
        }
    })

    if (userExist) {
        return userExist;
    }

}

export async function createUser(user: ICreateUser, ctx: Context) {

    const userExist = await findUserByEmail(user.email, ctx);

    if (userExist) {
        throw new Error("User already exist in system");
    }

    return await ctx.prisma.user.create({
        data: user,
    });
}

describe("Create user", () => {

    it("Should return user created", async () => {

        const user = {
            "id": "54545151511",
            "firstName": "Fulano",
            "lastName": "de Tal",
            "email": "fulaninho@gmail.com",
            "password": "123456",
            "isAdmin": false
        }

        mockCtx.prisma.user.create.mockResolvedValue(user)

        const userCreated = await createUser(user, ctx)

        expect(userCreated).toEqual({
            id: '54545151511',
            firstName: 'Fulano',
            lastName: 'de Tal',
            email: 'fulaninho@gmail.com',
            password: '123456',
            isAdmin: false,
        })

    });

    it("Should return error user already exist in the system", async () => {

        const user = {
            "id": "54545151511",
            "firstName": "Fulano",
            "lastName": "de Tal",
            "email": "fulaninho@gmail.com",
            "password": "123456",
            "isAdmin": false
        }

        mockCtx.prisma.user.create.mockResolvedValue(user)
        mockCtx.prisma.user.findFirst.mockResolvedValue(user)

        await expect(createUser(user, ctx)).rejects.toThrow();

    });


});