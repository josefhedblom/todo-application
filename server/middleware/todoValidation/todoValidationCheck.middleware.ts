import { check } from 'express-validator';

const createTodoValidationCheck = [
  check('title').isLength({ min: 2 }).trim().escape()
]


export {
  createTodoValidationCheck
};