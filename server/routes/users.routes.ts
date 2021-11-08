import Express from 'express';
const UserRouter = Express.Router()
import isValidToken from '../helpers/verifyToken.helpers'
import { createUser, verifyUser, loginUser, deleteUser, account } from '../controllers/users.controllers';


UserRouter.get('/verifi-email', verifyUser);
UserRouter.get("/account/", isValidToken, account);
UserRouter.post('/signup', createUser);
UserRouter.post('/login', loginUser);
UserRouter.delete('/:userId', deleteUser);

export default UserRouter

