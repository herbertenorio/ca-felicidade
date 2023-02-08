import { Request, Response } from "express";
import { CreateCategory } from "../services/CreateCategory";
import { DeleteCategory } from "../services/DeleteCategory";
import { ListCategory } from "../services/ListCategory";
import { UpdateCategory } from "../services/UpdateCategory";


export class CategoryController {

    async handle(request: Request, response: Response) {

        let result
        let categoryData

        if (request.method == 'POST') {

            categoryData = request.body

            const createCategory = new CreateCategory();
            result = await createCategory.execute(categoryData);

            if (result) {
                response.status(201).json(result);
                return
            }

        }

        if (request.method == 'GET') {

            const id = request.params.id
            const listCategory = new ListCategory();

            if (id) {
                result = await listCategory.listCategoryById(id)
            } else {
                result = await listCategory.listAll()
            }

            response.status(200).json(result);
            return

        }

        if (request.method == 'PUT') {

            categoryData = request.body

            const updateCategory = new UpdateCategory();

            if (categoryData) {

                result = await updateCategory.execute(categoryData, request.id_user_auth);

                response.status(200).json(result);
                return
            }

        }

        if (request.method == 'DELETE') {

            const id = request.params.id
            const deleteCategory = new DeleteCategory();

            if (id) {
                result = await deleteCategory.execute(id, request.id_user_auth);
            } else {
                throw new Error("Id required")
            }

            response.status(200).json(result);
            return

        }

    }
}