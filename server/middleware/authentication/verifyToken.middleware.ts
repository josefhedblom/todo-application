import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { SECRET_TOKEN } from '../../config/env.config'

export = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Access Denid" })
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, SECRET_TOKEN);
    const id = Object.values(verifyToken)[0];
    res.locals.userId = id
    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" })
  }
}