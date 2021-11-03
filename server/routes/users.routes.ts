import Express from 'express';
const UserRouter = Express.Router()
import { user_signup, user_delete, user_login, user_update, user_veirfy } from '../controllers/users.controllers';

UserRouter.get('/verifi-email', user_veirfy);
UserRouter.post('/signup', user_signup);
UserRouter.post('/login', user_login);
UserRouter.patch('/:userId', user_update);
UserRouter.delete('/:userId', user_delete);

export default UserRouter

