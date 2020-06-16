import { Router } from 'express';
import CheckAuth from '../middleware/CheckAuth';
import multerUploads from '../middleware/multerConfig';
import ConvertController from '../controllers/ConvertController';

const baseRoute = Router();
const convertRoute = Router();

convertRoute.post('/upload', CheckAuth.verifyAuth, multerUploads.single('file'), ConvertController.uploadFile);

baseRoute.use('/convert', convertRoute);

export default baseRoute;