import { prisma } from "../../../InstanceDB"

export class DeletePost {

    async execute(idPostDelete: string, idUserAuth: string) {

        const userAuth = await prisma.user.findFirst({
            where: {
                id: idUserAuth
            }
        })

        if (userAuth?.isAdmin) {

            const post = await prisma.post.delete({
                where: {
                    id: idPostDelete
                }
            })

            if (post) {
                return {
                    message: "Post: " + post.title + ", with id: " + post.id + " deleted with success"
                }
            } else {
                throw new Error("Post not exist in the system")
            }

        } else {
            throw new Error("Authenticated user is not admin. Operation not allowed")
        }

    }

}