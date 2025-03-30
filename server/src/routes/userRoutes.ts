import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserProfilePicture,
  toggleUserActiveStatus,
} from "../controllers/userController";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", upload.single("profilePicture"), createUser);
router.put("/:id", upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/profile-picture", getUserProfilePicture);
router.patch("/:id/toggle-status", toggleUserActiveStatus);

export default router;
