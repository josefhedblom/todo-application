import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { SECRET_TOKEN } from '../../config/env.config'

export = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token) {
    return res.status(401).json({ error: "Access Denid" })
  }

  const token = req.cookies.token;
  try {
    const verifiedToken = jwt.verify(token, SECRET_TOKEN);
    res.locals.user = verifiedToken
    return next();
  } catch (error) {
    return res.status(403);
  }
}