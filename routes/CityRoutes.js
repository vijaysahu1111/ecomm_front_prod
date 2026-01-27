import express from 'express';
import { GetAllCity, Hello, pdf } from '../controllers/CityController.js';
const routes = express.Router();

routes.get("/", GetAllCity);

routes.get("/demo", Hello)

routes.get("/pdf", pdf)
export default routes;