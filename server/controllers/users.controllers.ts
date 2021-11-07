import { Request, Response } from 'express';
import { create, verification, login, deleteOneUser, findOneUser } from '../services/user.service';
import emailVerfication from '../helpers/emailVerfication.helper'

export const account = async (req: Request, res: Response) => {
  const user = await findOneUser(res.locals.userId);
  res.status(200).json({ user: user })
}

export const createUser = async (req: Request, res: Response) => {
  const payload = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    emailToken: emailVerfication.token
  }
  const user = await create(payload);
  res.status(user.status).json({ message: user.message, emailVerfication: emailVerfication.verificationLink });
}

export const verifyUser = async (req: Request, res: Response) => {
  const user = await verification(req.query.token as string);
  res.status(user.status).json({ message: user.message });
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await login({ email, password })
  res.status(user.status).json({ message: user.message });
}

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const user = await deleteOneUser(userId)
  res.status(user.status).json({ message: user.message });
}