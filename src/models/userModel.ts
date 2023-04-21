import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"]
    },
  },
  {
    timestamps: true,
  }
)

const ContactModel = mongoose.model("User", userSchema)

export default ContactModel
