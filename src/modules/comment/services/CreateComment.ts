import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { prisma } from "../../../InstanceDB"

interface ICreateCommentDTO {
    idPost: string
    content: string
}

export class CreateComment {

    async execute(commentData: ICreateCommentDTO, idAuthor: string) {

        //salvar comentários
        const comment = await prisma.comment.create({
            data: {
                fk_id_post: commentData.idPost,
                fk_id_user: idAuthor,
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