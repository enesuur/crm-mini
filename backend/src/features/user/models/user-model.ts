import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      lowercase: true,
      maxlength: 256,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 256,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("CRM_User", UserSchema);

export default UserModel;
