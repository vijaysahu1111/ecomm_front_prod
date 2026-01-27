import express from 'express';
import IsAdminLoggedIn from '../util/IsAdminLoggedIn.js';
import {SaveCategory, GetAllCategory, GetAllCategoryWithSubCate, GetByIdCategory, UpdateCategory, DeleteCategory, DeleteAll} from '../controllers/CategoryController.js'

const routes = express.Router();

routes.get("/", GetAllCategory)

routes.get("/getallcategorywithsubcate", GetAllCategoryWithSubCate)
routes.get("/deleteall", DeleteAll)

routes.get("/:id", GetByIdCategory)
routes.post("/", IsAdminLoggedIn, SaveCategory)
routes.put("/:id", IsAdminLoggedIn, UpdateCategory)
routes.delete("/:id", IsAdminLoggedIn, DeleteCategory)



/*
    localhost:3000/api/v1/category ---- ReST API category
    but, when you use
    .post
    .put
    .delete
    you have to send "token" in authorization

    .find({$and : [{age : 25}, {city : "indore"}]})


*/

export default routes;