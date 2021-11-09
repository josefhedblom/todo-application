import { Router } from 'express';
import isValidToken from '../../middleware/authentication/verifyToken.middleware'
import { create, deleteOneTodo, updateOneTodo, todos } from '../../controllers/todos.controller';
import { validationRequestResults } from '../../middleware/validationErrorHandler/validationErrors.middleware'
import { createTodoValidationCheck } from '../../middleware/todoValidation/todoValidationCheck.middleware'


const Route = Router()
Route.get("/", isValidToken, todos)
Route.post("/new", isValidToken, createTodoValidationCheck, validationRequestResults, create);
Route.patch("/:todoId", isValidToken, updateOneTodo)
Route.delete('/:todoId', isValidToken, deleteOneTodo)


export { Route as TodoRouter }

