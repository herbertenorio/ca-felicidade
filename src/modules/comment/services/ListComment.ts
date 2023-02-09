import { prisma } from "../../../InstanceDB"

export class ListComment {


    async listAll() {

        const comment = await prisma.comment.findMany()

        if (comment) {
            return comment;
        } else {
            return { message: "Not found record" }
        }


    }

    async listCategoryById(id: string) {

        const comment = await prisma.comment.findFirst({
            where: {
                id: id
            }
        })

        if (comment) {
            return comment;
        } else {
            return { message: "Not found record" }
        }
    }

}