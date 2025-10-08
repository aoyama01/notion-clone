import mongoose, { Document, Schema } from "mongoose";

// User document interface
export interface IUser extends Document {
  username: string;
  password: string;
}

// User schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
