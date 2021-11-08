import { Router } from 'express';
import isValidToken from '../../helpers/verifyToken.helpers'
import { create, deleteOneTodo } from '../../controllers/todos.controller';


const Route = Router()
Route.post("/new", isValidToken, create);
Route.delete('/:todoId', isValidToken, deleteOneTodo)


export { Route as TodoRouter }

