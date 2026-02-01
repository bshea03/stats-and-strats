import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

// ============ USER SCHEMA ============
const UserGameSchema = new Schema(
  {
    gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    icon: { type: String, default: null },
    games: [UserGameSchema],
  },
  { timestamps: true },
);

// hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;

  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// Method to validate password
UserSchema.methods.validPassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
