import Express from 'express';
const App = Express();
const PORT = 5000
App.use(Express.json());


import connectDB from './config/db.config';
import UserRouter from './routes/users/user.routes';
App.use('/users', UserRouter);
connectDB();
App.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
