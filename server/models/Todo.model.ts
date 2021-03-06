import Mongoose, { Schema, Document } from "mongoose";

export interface TodoInput extends Document {
  title: string;
  user: string;
}

export interface TodoDocument extends TodoInput, Mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    lowercase: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});


const TodoModel = Mongoose.model<TodoDocument>("Todo", TodoSchema);
export default TodoModel;