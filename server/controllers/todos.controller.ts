import { Request, Response } from 'express';
import TodoModel from '../models/Todo.model';

export const todos = async (req: Request, res: Response) => {
  const allTodos = await TodoModel.find({ user: res.locals.user.id });
  res.status(200).json({ todos: allTodos })
}

export const create = async (req: Request, res: Response) => {
  const todo = await TodoModel.create({
    title: req.body.title,
    user: res.locals.user.id
  });
  res.status(201).json({ message: "Todo created", todo: todo })
}

export const updateOneTodo = async (req: Request, res: Response) => {
  try {
    const todo = await TodoModel.findOneAndUpdate({ _id: req.params.todoId }, { "$set": { "title": req.body.title } }, { new: true })
    return res.status(200).json({ message: "Todo updated", todo: todo })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}

export const deleteOneTodo = async (req: Request, res: Response) => {
  try {
    const todo = await TodoModel.deleteOne({ _id: req.params.todoId })
    return res.status(200).json({ message: "Todo deleted" })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}