import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { SECRET_TOKEN } from '../../config/env.config'

export = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Access Denid" })
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, SECRET_TOKEN, (error, user) => {
    if (error) return res.status(403);
    res.locals.user = user
    next()
  });
}