import express from 'express';
import { FilterProduct } from '../controllers/ProductSearchController.js';

let routes = express.Router();

routes.get("/", FilterProduct)

export default routes;