import express from 'express';
import {
    CityRoutes,
    UserAuthRoutes, 
    UserRoutes, 
    CategoryRoutes,
    SubCategoryRoutes,
    AdminAuthRoutes,
    ProductRoutes,
    OrderRoutes,
    CartRoutes,
    SearchPro
} from './index.js'


import PaginationRoute from './PaginationRoutes.js'
const routes = express.Router();

routes.use("/api/v1/city", CityRoutes);
routes.use("/api/v1/user", UserRoutes);
routes.use("/api/v1/userauth",UserAuthRoutes);
routes.use("/api/v1/adminauth", AdminAuthRoutes);
routes.use("/api/v1/category", CategoryRoutes)
routes.use("/api/v1/cart", CartRoutes)
routes.use("/api/v1/subcategory", SubCategoryRoutes)
routes.use("/api/v1/product", ProductRoutes)
routes.use("/api/v1/order", OrderRoutes)


routes.use("/api/v1/pagination", PaginationRoute)
routes.use("/api/v1/search", SearchPro)





export default routes;