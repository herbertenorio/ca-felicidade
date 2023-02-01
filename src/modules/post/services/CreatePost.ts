import { prisma } from "../../../InstanceDB"

interface ICreatePostDTO {
    title: string
    authorId: string
    categoryId: string
}

export class CreatePost {

    async execute(postData: ICreatePostDTO, authorID: string) {

        postData.authorId = authorID

        //salvar post
        const post = await prisma.post.create({
            select: {
                id: true,
                title: true,
                createdAt: true,
                PostCategory: true,
            },
            data: {
                title: postData.title,
                user: {
                    connect: {
                        id: postData.authorId
                    }
                },
                PostCategory: {
                    create: {
                        category: {
                            connect: {
                                id: postData.categoryId
                            }
                        }
                    }
                }

            }
        })

        return post;

    }

}