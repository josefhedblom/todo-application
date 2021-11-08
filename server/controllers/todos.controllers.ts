import { Request, Response } from 'express';
import { createTodo, deleteTodo } from '../services/todo.service';

export const create = async (req: Request, res: Response) => {
  const { title } = req.body;
  const todo = await createTodo(title);
  res.status(todo.status).json(todo.message)
}

export const deleteOneTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const todo = await deleteTodo(todoId);
  res.status(todo.status).json(todo.message)
}