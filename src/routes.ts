
import { Router } from "express"
import { ensureAuthenticateUser } from "./middlewares/ensureAuthenticateUser"
import { AuthenticateUserController } from "./modules/auth/user/controller/AuthenticateUserController"
import { UserController } from "./modules/user/controller/UserController"

const authenticateUserController = new AuthenticateUserController()
const userController = new UserController()
const routes = Router()

//User
routes.post("/user/authenticate", authenticateUserController.handle)
routes.post("/user/", userController.handle)
routes.put("/user/", ensureAuthenticateUser, userController.handle)
routes.get("/user/", userController.handle)

export { routes }