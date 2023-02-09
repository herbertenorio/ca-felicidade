import { Request, Response } from "express";
import { CreateComment } from "../services/CreateComment";
import { DeleteComment } from "../services/DeleteComment";
import { ListComment } from "../services/ListComment";
import { UpdateComment } from "../services/UpdateComment";


export class CommentController {

    async handle(request: Request, response: Response) {

        let result

        if (request.method == 'POST') {

            const commentData = request.body

            const createComment = new CreateComment()
            result = await createComment.execute(commentData, request.id_user_auth)

            if (result) {
                response.status(201).json(result);
                return
            }

        }

        if (request.method == 'GET') {

            const id = request.params.id
            const listComment = new ListComment();

            if (id) {
                result = await listComment.listCategoryById(id)
            } else {
                result = await listComment.listAll()
            }

            response.status(200).json(result);
            return

        }

        if (request.method == 'PUT') {

            const commentData = request.body

            const updateComment = new UpdateComment();

            if (commentData) {

                result = await updateComment.execute(commentData, request.id_user_auth);

                response.status(200).json(result);
                return
            }

        }

        if (request.method == 'DELETE') {

            const id = request.params.id
            const deleteComment = new DeleteComment();

            if (id) {
                result = await deleteComment.execute(id, request.id_user_auth);
            } else {
                throw new Error("Id required")
            }

            response.status(200).json(result);
            return

        }

    }
}