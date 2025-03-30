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

    res.status(200).json(userToResponse(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

// Create a new user
export const createUser = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  try {
    // Create a properly typed user data object
    const userData: Partial<IUser> = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    // Add profile picture if it exists
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

// Update user details
export const updateUser = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  try {
    const userData: Partial<IUser> = { ...req.body };

    // Add profile picture if it exists
    if (req.file) {
      userData.profilePicture = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      userData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: userToResponse(updatedUser),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Failed to update user", error });
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

// Get user profile picture
export const getUserProfilePicture = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user || !user.profilePicture || !user.profilePicture.data) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    res.set("Content-Type", user.profilePicture.contentType);
    return res.send(user.profilePicture.data);
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    res.status(500).json({ message: "Failed to fetch profile picture", error });
  }
};
