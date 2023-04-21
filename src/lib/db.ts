import mongoose from "mongoose"
import { DB_URI } from "../config/env"

export const connect = async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log("DB Connected")
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
