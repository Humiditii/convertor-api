import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import EmptyCheck from '../middleware/EmptyCHeck';

const baseRoute = Router();
const authRouter = Router();

authRouter.post('/signup', AuthController.signup);

authRouter.post('/signin', AuthController.signin);

baseRoute.use('/auth', authRouter);

export default baseRoute;
