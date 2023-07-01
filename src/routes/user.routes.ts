import express, {Request, Response} from "express"
import { CheckEmail, CreateUser, FindEmail } from "../services/users.service";
import config from "config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/create-user", async (req: Request, res: Response) => {
    const { email, password, full_name } = req.body;
    if (password.length < 6) {
      return res.status(400).send({
        message: "Password too Short",
        success: false
      });
    }
    const emailExists = await CheckEmail(email);
    if (emailExists) {
      return res.status(400).send({
        message: "Email Already Exists!",
        success: false
      });
    }
    await CreateUser({ email, password, full_name });
    return res.status(201).json({
      success: true,
      message: "User Signed Up Successfully",
    });
})

router.post("/login-user", async (req: Request, res:Response) => {
    const {email, password} = req.body;
  const emailExists = await CheckEmail(email);
  if (!emailExists) {
    return res.status(401).send({
      message: "Invalid Email or Passwords",
      success: false
    });
  }
  const user: any = await FindEmail(email);
  const isValidPassword = await bcrypt.compare(password, user?.password);
  if (!isValidPassword) {
    return res.status(401).send({
      message: "Invalid Email or Password",
      success: false
    });
  }
  const payload = {
    user_id: user?._id,
    email: user?.email,
  };

  const token = jwt.sign(payload, config.get<string>("JWT_SECRET_KEY"), {
    expiresIn: "30d"
  });
  return res.status(200).json({
    success: true,
    message: "User Logged In Successfully",
    token,
  });
})

export default router

