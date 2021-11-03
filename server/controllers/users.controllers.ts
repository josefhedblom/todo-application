import { SECRET_TOKEN } from '../config/env.config'
import User from '../models/User.models';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


export const membersPage = async (req: Request, res: Response) => {

  if (!req.headers.authorization) {
    return res.status(400.).json({ error: "Not A Valid Token" })
  }

  let token = req.headers.authorization.split(" ")[1];
  const verifyToken = jwt.verify(token, SECRET_TOKEN);
  const userId = Object.values(verifyToken)[0];
  if (verifyToken) {
    const user = await User.findOne({ _id: userId });


    try {

      if (user) {
        console.log("User can access member page!");
        return res.status(200).json({ username: user.username, todos: user.missions });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("User can't access member page!");
    return res.status(400).json({ error: "Not Authorized To View Page" });
  }
};

export const user_signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const emailToken = crypto.randomBytes(64).toString('hex')
  const message = `http://localhost:5000/users/verifi-email?token=${emailToken}`
  try {
    await User.create({ username, email, password, emailToken: emailToken })
    return res.status(201).json({ message: "Verify your account through your email", emailMessage: message });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
}

export const user_veirfy = async (req: Request, res: Response) => {
  const verifyUser = await User.findOne({ emailToken: req.query.token })

  if (!verifyUser) {
    return res.status(400).json({ error: "Could not verify the account, please contact our support, support@support.com" })
  }
  const userId = verifyUser._id
  const userUpdates = { emailToken: null, isVerified: true }
  const options = { new: true }

  const updateUser = await User.findByIdAndUpdate(userId, userUpdates, options)
  res.status(200).json({ message: "Account verifiyed", updateUser: updateUser });
}

export const user_login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const authUser = await User.findOne({ email });

  if (!authUser.isVerified) return res.status(401).json({ error: "Verify your account befor loggin" })

  if (!authUser) return res.status(401).json({
    title: 'Authentication Error',
    error: 'Invalid Credentials'
  });

  const authPassword = await bcrypt.compare(password, authUser.password);

  if (!authPassword) return res.status(401).json({
    title: 'Authentication Error',
    error: 'Invalid Credentials'
  });

  const authToken = jwt.sign({ id: authUser._id }, SECRET_TOKEN);
  return res.status(200).json({
    title: "Login Success",
    token: authToken
  });
};

export const user_update = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updates = req.body;
  const options = { new: true }
  try {
    const userUpdate = await User.findByIdAndUpdate(userId, updates, options);
    res.status(200).json({ message: "Profile updated", userUpdate: userUpdate });
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const user_delete = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }

};

export const todo_new = async (req: Request, res: Response) => {

  if (!req.headers.authorization) {
    return res.status(400.).json({ error: "Not A Valid Token" })
  }
  const { title } = req.body;

  let token = req.headers.authorization.split(" ")[1];
  const verifyToken = jwt.verify(token, SECRET_TOKEN);

  const userId = Object.values(verifyToken)[0];

  if (verifyToken) {
    try {
      const user = await User.findOne({ _id: userId });
      if (user) {
        user.missions.push({ title: title, id: crypto.randomBytes(64).toString('hex') })
        user.save();
        res.status(200).json({ user });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("User can't access member page!");
    return res.status(400).json({ error: "Not Authorized To View Page" });
  }
}


