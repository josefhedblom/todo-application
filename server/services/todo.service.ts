import TodoModel from '../models/Todo.model';

const result = { status: 200, message: "" }

export async function createTodo(title: string) {
  try {
    await TodoModel.create({ title })
    result.status = 201;
    result.message = "Todo has been created";
  } catch (error) {
    result.status = 500;
    result.message = `${error}`;
  }
  return result;
}

export async function updateTodo(todoId: string, title: string) {
  await TodoModel.findOneAndUpdate({ _id: todoId }, { "$set": { "title": title } }, { new: true })
    .exec()
    .then(() => {
      result.message = `Todo has been updated`
    })
    .catch((error: Error) => {
      result.status = 500;
      result.message = `${error.message}`
    })
  return result;
}

export async function deleteTodo(todoId: string) {
  await TodoModel.deleteOne({ _id: todoId })
    .exec()
    .then(() => {
      result.message = `Todo has been deleted`
    })
    .catch((error: Error) => {
      result.status = 500;
      result.message = `${error.message}`
    })
  return result;
}