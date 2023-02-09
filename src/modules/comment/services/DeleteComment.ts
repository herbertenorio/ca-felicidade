import { prisma } from "../../../InstanceDB"

export class DeleteComment {

    async execute(idCommentDelete: string, idUserAuth: string) {

        const commentExist = await prisma.comment.findUnique({
            where: {
                id: idCommentDelete
            }
        })

        if (!commentExist) {
            throw new Error("Comment not found")
        }

        const userAuth = await prisma.user.findFirst({
            where: {
                id: idUserAuth,
                Comment: {
                    some: {
                        id: idCommentDelete
                    }
                }
            }
        })

        if (!userAuth) {
            throw new Error("Unauthenticated comment author")
        }

        const comment = await prisma.comment.delete({
            where: {
                id: idCommentDelete
            }
        })

        return {
            message: "Comment with id: " + comment.id + " deleted with success"
        }

    }

}