import Express from 'express';
const UserRouter = Express.Router()
import { user_signup, user_delete, user_login, user_update, user_veirfy, membersPage, todo_new, todo_delete, todo_update } from '../controllers/users.controllers';

UserRouter.get('/verifi-email', user_veirfy);
UserRouter.get("/members/", membersPage);
UserRouter.post('/signup', user_signup);
UserRouter.post('/login', user_login);
UserRouter.post('/todo/new', todo_new);
UserRouter.patch('/:userId', user_update);
UserRouter.patch('/todo/update', todo_update);
UserRouter.delete('/:userId', user_delete);
UserRouter.delete('/todo/delete', todo_delete);

export default UserRouter

