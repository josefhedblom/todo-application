import { check } from 'express-validator';

const createTodoValidationCheck = [
  check('title').isLength({ min: 3 }).trim().escape()
]


export {
  createTodoValidationCheck
};