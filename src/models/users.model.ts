import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"

interface IUser {
    email: string
    password: string
    full_name: string
    _id: string
}

const userSchema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true, min: 6 },
    full_name: { type: String, required: true },
    _id: {type: String, required: true, unique: true, default: uuidv4()}
})

userSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 14);
    this.password = hash;
    next();
  });

  userSchema.methods.isValidPassword = async function (password: string) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  };
  
  const UserModel = model<IUser>("User", userSchema);
  
  export default UserModel;