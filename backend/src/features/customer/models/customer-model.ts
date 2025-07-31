import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICustomer extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  tag: string;
  note: string | null;
  date: Date | null;
  created_at: Date;
  updated_at: Date;
}

const CustomerSchema: Schema<ICustomer> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 5,
      maxlength: 254,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 11,
      match: /^\d+$/,
    },
    tag: {
      type: String,
      required: true,
      enum: ["Yüksek Öncelikli", "Öncelikli", "Normal"],
    },
    note: {
      type: String,
      minlength: 1,
      maxlength: 500,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const CustomerModel: Model<ICustomer> =
  mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", CustomerSchema);

export default CustomerModel;
