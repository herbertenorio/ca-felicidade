import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { prisma } from "../../../InstanceDB"

interface IUpdateCommentDTO {
    id: string
    content: string
}

export class UpdateComment {

    async execute(commentData: IUpdateCommentDTO, idUserAuth: string) {


        const userAuth = await prisma.user.findFirst({
            where: {
                id: idUserAuth,
                Comment: {
                    some: {
                        id: commentData.id
                    }
                }
            }
        })

        if (!userAuth) {
            throw new Error("Unauthenticated comment author")
        }

        const comment = await prisma.comment.update({
            where: {
                id: commentData.id,
            },
            data: {
                content: commentData.content
            }
        }).catch(e => {

            if (e instanceof PrismaClientKnownRequestError) {

                throw new Error("Prisma error code: " + e.code + ". Message:" + e.message)
            }

        })

        return comment;

    }

}