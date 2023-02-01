
import { Router } from "express"
import { CategoryController } from "./modules/category/controller/CategoryController"
import { ensureAuthenticateUser } from "./middlewares/ensureAuthenticateUser"
import { AuthenticateUserController } from "./modules/auth/user/controller/AuthenticateUserController"
import { UserController } from "./modules/user/controller/UserController"
import { PostController } from "./modules/post/controller/PostController"

const authenticateUserController = new AuthenticateUserController()
const userController = new UserController()
const categoryController = new CategoryController()
const postController = new PostController()
const routes = Router()

//User
routes.post("/user/authenticate", authenticateUserController.handle)
routes.post("/user/", userController.handle)
routes.put("/user/", ensureAuthenticateUser, userController.handle)
routes.get("/user/", userController.handle)
routes.get("/user/:id", userController.handle)
routes.delete("/user/:id", ensureAuthenticateUser, userController.handle)

//Category
routes.post("/category/", categoryController.handle)
routes.put("/category/", ensureAuthenticateUser, categoryController.handle)
routes.get("/category/", categoryController.handle)
routes.get("/category/:id", categoryController.handle)
routes.delete("/category/:id", ensureAuthenticateUser, categoryController.handle)

//Post
routes.post("/post/", ensureAuthenticateUser, postController.handle)
routes.put("/post/", ensureAuthenticateUser, postController.handle)
routes.get("/post/", postController.handle)
routes.get("/post/:id", postController.handle)
routes.delete("/post/:id", ensureAuthenticateUser, postController.handle)

export { routes }