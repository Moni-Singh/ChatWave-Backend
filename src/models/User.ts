import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  gender: string;
  dob: string;
  password: string;
  confirmpassword: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  next();
});

UserSchema.methods.comparePassword = function (enteredPassword: string) {
  const user = this as IUser;
  return bcrypt.compareSync(enteredPassword, user.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
