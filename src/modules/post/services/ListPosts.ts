import { prisma } from "../../../InstanceDB"

export class ListPosts {


    async listAll() {

        const post = await prisma.post.findMany({
            include: {
                PostCategory: {
                    select: {
                        category: true
                    }
                },
                Comment: true
            }
        })

        if (post) {
            return post;
        } else {
            return { message: "Not found record" }
        }
    }

    async listPostById(id: string) {

        const post = await prisma.post.findFirst({
            where: {
                id: id
            },
            include: {
                PostCategory: {
                    select: {
                        category: true
                    }
                },
                Comment: true
            }
        })

        if (post) {
            return post;
        } else {
            return { message: "Not found record" }
        }
    }

}