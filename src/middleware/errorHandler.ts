import { Request, Response } from "express"
import { ErrorConstants } from "../config"

const errorHandler = (err: Error, req: Request, res: Response) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  console.log("res.statusCode", res.statusCode)
  // res.status(statusCode)
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
}

export default errorHandler
