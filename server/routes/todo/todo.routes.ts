import { Router } from 'express';
import isValidToken from '../../middleware/authentication/verifyToken.middleware'
import { create, deleteOneTodo } from '../../controllers/todos.controller';
import { validationRequestResults } from '../../middleware/validationErrorHandler/validationErrors.middleware'
import { createTodoValidationCheck } from '../../middleware/todoValidation/todoValidationCheck.middleware'


const Route = Router()
Route.post("/new", isValidToken, createTodoValidationCheck, validationRequestResults, create);
Route.delete('/:todoId', isValidToken, deleteOneTodo)


export { Route as TodoRouter }

