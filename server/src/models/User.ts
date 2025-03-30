import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Interface for profile picture in the database
interface IProfilePicture {
  data: Buffer;
  contentType: string;
}

// Interface for profile picture in responses
export interface IProfilePictureResponse {
  contentType: string;
  hasImage: boolean;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture?: IProfilePicture;
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Interface for user object in responses (without binary data)
export interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: IProfilePictureResponse;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    profilePicture: {
      data: Buffer,
      contentType: String,
    },
    isActive: {
      type: Boolean,
      default: false, // Default to active
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
