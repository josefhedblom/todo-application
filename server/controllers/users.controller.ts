import { Request, Response } from 'express';
import emailVerfication from '../helpers/emailVerfication.helper'
import { SECRET_TOKEN } from '../config/env.config'
import UserModel from '../models/User.model';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const account = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne(res.locals.userId);
    return res.status(200).json({ user: user })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    await UserModel.create({
      username,
      email,
      password,
      emailToken: emailVerfication.token
    });
    return res.status(201).json({ message: "Account created! Please verify by the verication email", emailVerfication: emailVerfication.verificationLink })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}

export const verifyUser = async (req: Request, res: Response) => {
  const token: string = req.query.token as string
  try {
    const verifyUser = await UserModel.findOneAndUpdate({ emailToken: token }, { emailToken: null, isVerified: true }, { new: true })
    if (!verifyUser) {
      return res.status(400).json({ message: "Could not verify the account, please contact our support, support@support.com" })
    }
    return res.status(200).json({ message: "Account verifiyed" })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const authUser = await UserModel.findOne({ username });

  if (!authUser) return res.status(401).json({ errors: "Authentication Error - Invalid Credentials" })

  if (!authUser!.isVerified) return res.status(401).json({ errors: "Verify your account befor loggin" })

  const authPassword = await bcrypt.compare(password, authUser.password!);

  if (!authPassword) return res.status(401).json({ errors: "Authentication Error - Invalid Credentials" })

  const payload = { id: authUser._id }
  const accessToken = jwt.sign(payload, SECRET_TOKEN, { algorithm: 'HS256', expiresIn: "1h" });

  res.cookie('token', accessToken, {
    secure: false,
    httpOnly: true
  })
  res.status(200).json({ message: "Logged in" });
}

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie('token');
  return res.status(200).json({ message: "Logged out" });
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.deleteOne({ _id: res.locals.user.id })
    res.status(200).json({ message: "Account deleted", user: user });
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}