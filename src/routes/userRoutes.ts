import { Router } from "express"
import {
  GetAllUsers,
  LoginUser,
  RegisterUser,
  GetCurrentUserInfo,
} from "../controllers/userController"
import validateToken from "../middleware/validateUser"
const router = Router()

router.post("/register", RegisterUser)

router.post("/login", LoginUser)

router.get("/currentUser", validateToken, GetCurrentUserInfo)

router.get("/", GetAllUsers)

export default router
