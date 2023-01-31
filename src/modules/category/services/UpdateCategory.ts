import { prisma } from "../../../InstanceDB"

interface IUpdateCategoryDTO {
    id: string
    name: string
    description: string
}

export class UpdateCategory {

    async execute(categoryData: IUpdateCategoryDTO, idUserAuth: string) {

        const userAuth = await prisma.user.findFirst({
            where: {
                id: idUserAuth
            }
        })

        if (userAuth?.isAdmin) {

            const categoryExist = await prisma.category.findFirst({
                where: {
                    name: {
                        equals: categoryData.name,
                        mode: "insensitive"
                    },
                    id: {
                        not: categoryData.id
                    }
                }
            })

            if (categoryExist) {
                throw new Error("Category already exist in the system")
            }

            categoryData.name = categoryData.name.toLowerCase()
            categoryData.description = categoryData.description.toLowerCase()

            const category = await prisma.category.update({
                where: {
                    id: categoryData.id
                },
                data: categoryData
            })

            return category;

        } else {
            throw new Error("Authenticated user is not admin. Operation not allowed")
        }
    }

}