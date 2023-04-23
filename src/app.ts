import express from "express"
import cors from "cors"

import api from "./routes"
import * as errorMiddleware from "./middleware/errorHandler"

export const createApp = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use("/api/v1", api)
  app.use(errorMiddleware.notFound)
  app.use(errorMiddleware.errorHandler)

  return app
}
