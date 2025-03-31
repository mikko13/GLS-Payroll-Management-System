import { Request, Response } from "express";
import UserModel, {
  IUser,
  IUserResponse,
  IProfilePictureResponse,
} from "../models/User";

// Helper function to convert IUser to IUserResponse
const userToResponse = (user: IUser): IUserResponse => {
  const userObj = user.toObject();
  const response: IUserResponse = {
    _id: userObj._id.toString(),
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
    role: userObj.role,
    isActive: userObj.isActive,
    createdAt: userObj.createdAt,
    updatedAt: userObj.updatedAt,
  };

  // Add profile picture info without the binary data
  if (userObj.profilePicture) {
    response.profilePicture = {
      contentType: userObj.profilePicture.contentType,
      hasImage: true,
    };
  }

  return response;
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // Remove the @ts-ignore and properly type the request
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = req.user.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userToResponse(user));
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCurrentUser = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update basic fields
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;

    // Handle profile picture update
    if (req.file) {
      // If there was an existing profile picture, we would unlink it here if stored on disk
      // For MongoDB, we just overwrite the existing data
      user.profilePicture = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    } else if (req.body.removeProfilePicture === "true") {
      // Remove the profile picture
      user.profilePicture = undefined;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: userToResponse(updatedUser),
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(400).json({ message: "Failed to update profile", error });
  }
};

export const updateUser = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update basic fields
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;

    // Handle profile picture update
    if (req.file) {
      // If there was an existing profile picture, we would unlink it here if stored on disk
      // For MongoDB, we just overwrite the existing data
      user.profilePicture = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    } else if (req.body.removeProfilePicture === "true") {
      // Remove the profile picture
      user.profilePicture = undefined;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: userToResponse(updatedUser),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Failed to update user", error });
  }
};

// Add this to your controller file
export const toggleUserActiveStatus = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the isActive status
    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: `User ${
        user.isActive ? "activated" : "deactivated"
      } successfully`,
      user: userToResponse(user),
    });
  } catch (error) {
    console.error("Error toggling user status:", error);
    res.status(500).json({ message: "Failed to update user status", error });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });

    // Transform users to remove binary data
    const safeUsers = users.map((user) => userToResponse(user));

    res.status(200).json(safeUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = userToResponse(user);

    if (user.profilePicture && user.profilePicture.data) {
      userResponse.profilePicture = {
        contentType: user.profilePicture.contentType,
        hasImage: true,
        dataUrl: `data:${
          user.profilePicture.contentType
        };base64,${user.profilePicture.data.toString("base64")}`,
      };
    }

    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

export const createUser = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  try {
    const userData: Partial<IUser> = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    if (req.file) {
      userData.profilePicture = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const newUser = new UserModel(userData);
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: userToResponse(newUser),
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: "Failed to create user", error });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: userToResponse(deletedUser),
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Failed to update password", error });
  }
};

export const getUserProfilePicture = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user || !user.profilePicture || !user.profilePicture.data) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    res.set("Content-Type", user.profilePicture.contentType); // Fixed typo here
    res.set("Cache-Control", "public, max-age=86400");
    res.set("Access-Control-Allow-Origin", "*");

    return res.send(user.profilePicture.data);
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    res.status(500).json({ message: "Failed to fetch profile picture", error });
  }
};
