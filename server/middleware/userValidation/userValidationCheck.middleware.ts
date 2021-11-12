import { check } from 'express-validator';

const userRegisterValidationCheck = [
  check('username').isLength({ min: 3 }).trim().escape(),
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({ min: 8 }).escape()
]


const userLoginValidationCheck = [
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({ min: 8 }).escape()
]

export {
  userRegisterValidationCheck,
  userLoginValidationCheck
};