import express, { Request, Response, NextFunction } from "express"
import router from "./routes"
import { ErrorConstants } from "./config"

export const createApp = () => {
  const app = express()

  app.use(express.json())

  app.use(router)

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("err", err)
    const statusCode = res.statusCode ? res.statusCode : 500
    console.log("res.statusCode", res.statusCode)

    switch (statusCode) {
      case ErrorConstants.VALIDATION_ERROR:
        return res.status(ErrorConstants.VALIDATION_ERROR).json({
          title: "Validation Failed",
          message: err.message,
          stack: process.env.NODE_ENV === "production" ? null : err.stack,
        })
      case ErrorConstants.NOT_FOUND:
        return res.status(ErrorConstants.NOT_FOUND).json({
          title: "Not Found",
          message: err.message,
          stack: process.env.NODE_ENV === "production" ? null : err.stack,
        })
      case ErrorConstants.UNATHORIZED:
        return res.status(ErrorConstants.UNATHORIZED).json({
          title: "Unathorized",
          message: err.message,
          stack: process.env.NODE_ENV === "production" ? null : err.stack,
        })
      case ErrorConstants.FORBIDDEN:
        return res.status(ErrorConstants.FORBIDDEN).json({
          title: "Forbidden",
          message: err.message,
          stack: process.env.NODE_ENV === "production" ? null : err.stack,
        })
      default:
        return res.status(ErrorConstants.SERVER_ERROR).json({
          title: "Server Error",
          message: err.message,
          stack: process.env.NODE_ENV === "production" ? null : err.stack,
        })
    }
  })

  return app
}
