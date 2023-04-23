import { Router } from "express"
import contactRouter from "./contactRoutes"
import userRouter from "./userRoutes"
import MessageResponse from "../interfaces/MessageResponse"

const router = Router()

// test route to check if the API is working
router.get<"/", MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - working",
  })
})

router.use("/contacts", contactRouter)
router.use("/users", userRouter)

export default router
