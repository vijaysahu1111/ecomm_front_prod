import express from 'express';
import IsAdminLoggedIn from '../util/IsAdminLoggedIn.js';
import {SaveSubCategory, GetAllSubCategory, GetAllSubCategoryByCateId, GetByIdSubCategory, UpdateSubCategory, DeleteSubCategory, DeleteAll} from '../controllers/SubCategoryController.js'

const routes = express.Router();

routes.get("/", GetAllSubCategory)
routes.get("/deleteall", DeleteAll)
routes.get("/getallsubcate/:id", GetAllSubCategoryByCateId)
routes.get("/:id", GetByIdSubCategory)


routes.post("/", IsAdminLoggedIn, SaveSubCategory)
routes.put("/:id", IsAdminLoggedIn, UpdateSubCategory)
routes.delete("/:id", IsAdminLoggedIn, DeleteSubCategory)



/*
    localhost:3000/api/v1/SubCategory ---- ReST API SubCategory
    but, when you use
    .post
    .put
    .delete
    you have to send "token" in authorization


*/

export default routes;