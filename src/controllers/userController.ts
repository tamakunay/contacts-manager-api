import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import UserModel from "../models/userModel"
import { SECRET, TOKEN_EXPIRES_IN } from "../config"

//@desc Get users
//@route GET api/users/
//@access Private
export const GetAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find()
    res.status(200).json({ data: users })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

//@desc register users
//@route POST api/users/
//@access Private
export const RegisterUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      res.status(400).json({ message: "Please enter all fields" })
      throw new Error("Please enter all fields")
    }
    const checkUser = await UserModel.findOne({ email })
    if (checkUser) {
      res.status(400)
      throw new Error("User already exists")
    }

    const hasedPassword = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
      username,
      email,
      password: hasedPassword,
    })
    if (user) {
      const userData = {
        username: user.username,
        email: user.email,
      }
      res.status(201).json({ data: userData, message: "User created" })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  }
)

//@desc login users
//@route POST api/users/
//@access Private
export const LoginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("Please enter all fields")
  }

  const user: any = await UserModel.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    const userData = {
      username: user.username,
      email: user.email,
      id: user._id,
    }
    const token = jwt.sign(userData, SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    })
    res.status(200).json({ accessToken: token })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

//@desc Get users
//@route GET api/users/
//@access Private
export const GetCurrentUserInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body
    const userData = await UserModel.findOne({ email })
    if (userData) {
      const data = {
        username: userData.username,
        email: userData.email,
        id: userData._id,
      }
      res.status(200).json({ data })
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  }
)
