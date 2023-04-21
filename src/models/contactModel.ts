import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
    },
    phone: {
      type: String,
      required: [true, "Please enter a phone number"],
    },
    },
  {
    timestamps: true,
  }
)

const ContactModel = mongoose.model("Contact", contactSchema)

export default ContactModel
