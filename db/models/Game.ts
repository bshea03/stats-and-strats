import mongoose, { Schema } from "mongoose";

const sidebarItemSchema = new Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    pageId: { type: Schema.Types.ObjectId, ref: "Page", required: true },
  },
  { _id: false },
);

const GameSchema = new Schema(
  {
    srcId: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    sidebar: [sidebarItemSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Game || mongoose.model("Game", GameSchema);
