import express from 'express';
import IsAdminLoggedIn from '../util/IsAdminLoggedIn.js';
import IsUserLoggedIn from '../util/IsUserLoggedIn.js'
import {SaveCart, SaveCartWithoutLogin, DeleteAllByUserId, DeleteByIdCart, GetAllByUserIdCart} from '../controllers/CartController.js'

const routes = express.Router();

routes.get("/", IsUserLoggedIn, GetAllByUserIdCart)
routes.post("/", IsUserLoggedIn, SaveCart)
routes.post("/itemwithoutlogin", IsUserLoggedIn, SaveCartWithoutLogin)
routes.delete("/:id", IsUserLoggedIn, DeleteByIdCart)
routes.delete("/", IsUserLoggedIn, DeleteAllByUserId)




export default routes;