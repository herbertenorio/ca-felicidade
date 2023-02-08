import { Request, Response } from "express";
import { CreatePost } from "../services/CreatePost";
import { DeletePost } from "../services/DeletePost";
import { ListPosts } from "../services/ListPosts";
import { UpdatePost } from "../services/UpdatePost";

export class PostController {

    async handle(request: Request, response: Response) {

        let result
        let postData

        if (request.method == 'POST') {

            postData = request.body

            const createPost = new CreatePost();
            result = await createPost.execute(postData, request.id_user_auth);

            if (result) {
                response.status(201).json(result);
                return
            }

        }

        if (request.method == 'GET') {

            const id = request.params.id
            const listPost = new ListPosts();

            if (id) {
                result = await listPost.listPostById(id);
            } else {
                result = await listPost.listAll();
            }

            response.status(200).json(result);
            return

        }

        if (request.method == 'PUT') {

            postData = request.body
            const updatePost = new UpdatePost();

            if (postData) {

                result = await updatePost.execute(postData, request.id_user_auth);
                response.status(200).json(result);
                return

            }

        }

        if (request.method == 'DELETE') {

            const id = request.params.id
            const deletePost = new DeletePost();

            if (id) {
                result = await deletePost.execute(id, request.id_user_auth);
            } else {
                throw new Error("Id required")
            }

            response.status(200).json(result);
            return

        }

    }
}