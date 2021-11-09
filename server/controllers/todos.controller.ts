import { Request, Response } from 'express';
import { createTodo, deleteTodo, updateTodo, fetchTodos } from '../services/todo.service';

export const todos = async (req: Request, res: Response) => {
  const todos = await fetchTodos(res.locals.user.id);
  res.status(200).json(todos)
}

export const create = async (req: Request, res: Response) => {
  const todo = await createTodo(req.body.title, res.locals.user.id);
  res.status(todo.status).json(todo.message)
}

export const updateOneTodo = async (req: Request, res: Response) => {
  const todo = await updateTodo(req.params.todoId, req.body.title);
  res.status(todo.status).json(todo.message)
}

export const deleteOneTodo = async (req: Request, res: Response) => {
  const todo = await deleteTodo(req.params.todoId);
  res.status(todo.status).json(todo.message)
}