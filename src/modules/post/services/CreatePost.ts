import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { prisma } from "../../../InstanceDB"
interface ICreatePostDTO {
    title: string
    content: string
    authorId: string
    categoryIds?: []
}


export class CreatePost {

    async execute(postData: ICreatePostDTO, authorID: string) {

        postData.authorId = authorID

        const postExist = await prisma.post.findFirst({
            where: {
                title: {
                    equals: postData.title,
                    mode: "insensitive"
                }
            }
        })

        if (postExist) {
            throw new Error("Post with that title already exists",)
        }

        const result = await prisma.$transaction(async (prisma) => {

            const post = await prisma.post.create({
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                },
                data: {
                    title: postData.title,
                    content: postData.content,
                    user: {
                        connect: {
                            id: postData.authorId
                        }
                    }
                }
            })

            if (postData.categoryIds) {


                for (let i = 0; i < postData.categoryIds.length; i++) {

                    const element = postData.categoryIds[i];

                    await prisma.postCategory.createMany({
                        data: {
                            fk_id_category: element,
                            fk_id_post: post.id
                        }
                    }).catch(e => {

                        if (e instanceof PrismaClientKnownRequestError) {

                            throw new Error("Prisma error code: " + e.code + ". Message:" + e.message)
                        }


                    })

                }
            }

            return post

        })

        return result

    }

}