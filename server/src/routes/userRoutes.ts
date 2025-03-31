// routes/userRoutes.ts
import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserProfilePicture,
  toggleUserActiveStatus,
  getCurrentUser,
  updateCurrentUser,
  updateUserPassword // Add this import
} from "../controllers/userController";
import upload from "../middleware/upload";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

// Add these new routes with authentication middleware
router.get("/current", authenticateUser, getCurrentUser);
router.put(
  "/current",
  authenticateUser,
  upload.single("profilePicture"),
  updateCurrentUser
);

// Existing routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", upload.single("profilePicture"), createUser);
router.put("/:id", upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/profile-picture", getUserProfilePicture);
router.patch("/:id/toggle-status", toggleUserActiveStatus);
router.put(
  "/:id/password",
  authenticateUser,
  updateUserPassword // Use the imported function directly
);

export default router;