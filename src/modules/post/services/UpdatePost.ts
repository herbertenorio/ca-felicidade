import { prisma } from "../../../InstanceDB"

interface IUpdatePostDTO {
    id: string
    title: string
}

export class UpdatePost {

    async execute(postData: IUpdatePostDTO, idUserAuth: string) {

        const postValidation = await prisma.post.findFirst({
            where: {
                id: postData.id,
                authorId: idUserAuth
            }
        })

        if (postValidation) {

            const post = await prisma.post.update({
                where: {
                    id: postData.id
                },
                data: {
                    title: postData.title
                }
            })

            return post;

        } else {
            throw new Error("User is not the owner of this post. Operation not allowed")
        }
    }

}