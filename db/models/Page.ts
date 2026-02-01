import mongoose, { Schema } from "mongoose";

const ColumnSchema = new Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

const RowSchema = new Schema({
  icon: { type: String, default: null },
  data: { type: Map, of: String, required: true },
});

const TableSchema = new Schema(
  {
    title: String,
    description: String,
    columns: [ColumnSchema],
    rows: [RowSchema],
  },
  { _id: false },
);

const ContentSchema = new Schema(
  {
    type: { type: String, enum: ["table"], default: "table" },
    table: TableSchema,
  },
  { _id: false },
);

const TabSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    content: [ContentSchema],
  },
  { _id: false },
);

const PageSchema = new Schema(
  {
    gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
    description: { type: String, default: null },
    tabs: [TabSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Page || mongoose.model("Page", PageSchema);
