import express from "express"
const router = express.Router()
import {
  GetAllContacts,
  CreateContact,
  DeleteContact,
  GetContactById,
  UpdateContact,
} from "../controllers/contactController"
import validateToken from "../middleware/validateUser"

router.use(validateToken)

// @route   GET api/contacts
// @desc    Get all users contacts
router.get("/", GetAllContacts)

// @route   GET api/contacts/:id
// @desc    Get single contact
router.get("/:id", GetContactById)

// @route   POST api/contacts
// @desc    Add new contact
router.post("/", CreateContact)

// @route   PATCH api/contacts/:id
// @desc    Update contact
router.patch("/:id", UpdateContact)

// @route   DELETE api/contacts/:id
// @desc    Delete contact
router.delete("/:id", DeleteContact)

export default router
