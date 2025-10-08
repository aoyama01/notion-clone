import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user";

// Memo document interface
export interface IMemo extends Document {
  user: IUser["_id"];
  icon: string;
  title: string;
  description: string;
  position: number;
  favorite: boolean;
  favoritePosition: number;
}

// Memo schema
const memoSchema = new Schema<IMemo>({
  user: {
    // typeとrefはセット
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "無題",
  },
  description: {
    type: String,
    default: "ここにメモを記入して下さい．",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

// Memo model
const Memo = mongoose.model<IMemo>("Memo", memoSchema);

export default Memo;
