import { Request, Response, NextFunction } from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import { SECRET } from "../config"

const validateToken = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token
    const authHeader =
      req.headers.authorization || req.headers.Authorization
    if (!authHeader || authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]
      console.log('token', token)
      jwt.verify(token, SECRET, (err: any, decoded: any) => {
        if (err) {
          res.status(401)
          throw new Error("User is not authorized")
        }
        req.user = decoded
        next()
      })

      if (!token) {
        res.status(401)
        throw new Error("User is not authorized")
      }
    }
  }
)

export default validateToken
