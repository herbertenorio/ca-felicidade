import { prisma } from "../../../InstanceDB"

export class DeleteCategory {

    async execute(idCategoryDelete: string, idUserAuth: string) {

        const categoryExist = await prisma.category.findUnique({
            where: {
                id: idCategoryDelete
            }
        })

        if (!categoryExist) {
            throw new Error("Category not found")
        }

        const userAuth = await prisma.user.findFirst({
            where: {
                id: idUserAuth
            }
        })

        if (userAuth?.isAdmin) {

            const category = await prisma.category.delete({
                where: {
                    id: idCategoryDelete
                }
            })

            if (category) {
                return {
                    message: "Category: " + category.name + ", with id: " + category.id + " deleted with success"
                }
            } else {
                throw new Error("Category not exist in the system")
            }

        } else {
            throw new Error("Authenticated user is not admin. Operation not allowed")
        }

    }

}