import express from 'express';
import { AdminAuth, AdminAdd, GetAllAdmin } from '../controllers/AdminAuthController.js';
import IsAdminLoggedIn from '../util/IsAdminLoggedIn.js'
const routes = express.Router();

routes.post("/", AdminAuth);
routes.post("/add", IsAdminLoggedIn, AdminAdd);
routes.get("/list", IsAdminLoggedIn, GetAllAdmin);

export default routes;