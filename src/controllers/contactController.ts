import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import ContactModel from "../models/contactModel"

//@desc Get contact
//@route GET api/contacts/:id
//@access private
export const GetAllContacts = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.body
  const contacts = await ContactModel.find({ user_id: req.user.id })
  res.status(200).json({ data: contacts })
})

//@desc Get contact
//@route GET api/contacts/:id
//@access private
export const GetContactById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const contact = await ContactModel.findById({ _id: id })
    if (!contact) {
      res.status(404)
      throw new Error("Contact not found")
    }
    res.status(200).json({ data: contact })
  }
)

//@desc Add contact
//@route POST api/contacts
//@access private
export const CreateContact = asyncHandler(async (req: any, res: Response) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    res.status(400)
    throw new Error("Please enter all fields")
  }

  const contacts = await ContactModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  })

  res.status(201).json(contacts)
})

//@desc Update contact
//@route PUT api/contacts/:id
//@access private
export const UpdateContact = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params
  const contact = await ContactModel.findById({ _id: id })
  if (!contact) {
    res.status(404)
    throw new Error("Contact not found")
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("Not authorized to update this contact")
  }

  const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedContact)
})

//@desc Delete contact
//@route DELETE api/contacts/:id
//@access private
export const DeleteContact = asyncHandler(
  async (req: any, res: Response) => {
    const { id } = req.params
    const contact = await ContactModel.findById({ _id: id })
    if (!contact) {
      res.status(404)
      throw new Error("Contact not found")
    }

    if (contact.user_id.toString() !== req.user.id) {
      res.status(403)
      throw new Error("Not authorized to delete this contact")
    }

    await ContactModel.findByIdAndDelete(id)
    res.status(200).json({ message: "Contact Deleted", data: contact })
  }
)
