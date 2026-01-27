import express from 'express';
import IsAdminLoggedIn from '../util/IsAdminLoggedIn.js';
import {SaveProduct, GetAllProduct, UploadImage, CountProduct, GetAllLatestCollProduct, GetByIdProduct, GetAllProCateSubCate, UpdateProduct, DeleteProduct, DeleteAll} from '../controllers/ProductController.js'

const routes = express.Router();

routes.get("/", GetAllProduct)
routes.get("/latestcollection", GetAllLatestCollProduct)
routes.get("/countproduct", IsAdminLoggedIn, CountProduct)
routes.put("/uploadimage/:id", IsAdminLoggedIn, UploadImage)
routes.get("/deleteall", DeleteAll)

routes.get("/getallproductbycateandsubcate/:cate", GetAllProCateSubCate)
routes.get("/getallproductbycateandsubcate/:cate/:subcate", GetAllProCateSubCate)


routes.get("/:id", GetByIdProduct)

routes.post("/", IsAdminLoggedIn, SaveProduct)
routes.put("/:id", IsAdminLoggedIn, UpdateProduct)
routes.delete("/:id", IsAdminLoggedIn, DeleteProduct)



/*
    localhost:3000/api/v1/category ---- ReST API category
    but, when you use
    .post
    .put
    .delete
    you have to send "token" in authorization


*/

export default routes;