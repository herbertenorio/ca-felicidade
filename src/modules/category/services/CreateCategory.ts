import { prisma } from "../../../InstanceDB"

interface ICreateCategoryDTO {
    name: string
    description: string
}

export class CreateCategory {

    async execute(categoryData: ICreateCategoryDTO) {

        const categoryExist = await prisma.category.findFirst({
            where: {
                name: {
                    equals: categoryData.name,
                    mode: "insensitive"
                }
            }
        })

        if (categoryExist) {
            throw new Error("Category already exist in the system")
        }

        categoryData.name = categoryData.name.toLowerCase()
        categoryData.description = categoryData.description.toLowerCase()

        //salvar categoria
        const category = await prisma.category.create({
            data: categoryData
        })

        return category;

    }

}