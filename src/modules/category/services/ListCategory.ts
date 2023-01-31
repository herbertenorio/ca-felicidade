import { prisma } from "../../../InstanceDB"

export class ListCategory {


    async listAll() {

        const category = await prisma.category.findMany()

        return category;
    }

    async listCategoryById(id: string) {

        const category = await prisma.category.findFirst({
            where: {
                id: id
            }
        })

        return category;
    }

}