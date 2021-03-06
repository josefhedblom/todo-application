import Express from 'express';
import cookieParser from 'cookie-parser'

const App = Express();
const PORT = 5000
App.use(Express.urlencoded({ extended: true }))
App.use(Express.json());
App.use(cookieParser());

import connectDB from './config/db.config';
import { UserRouter } from './routes/user/user.routes';
import { TodoRouter } from './routes/todo/todo.routes';

App.use(UserRouter);
App.use('/todo', TodoRouter);
connectDB();
App.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
