import { Router } from "express"
import contactRouter from "./contactRoutes"
import userRouter from "./userRoutes"

const router = Router()

router.use("/api/contacts", contactRouter)
router.use("/api/users", userRouter)

export default router
