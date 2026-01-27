import express from 'express';
import { SaveUser, DeleteAll, UploadProfilePic, CountUser, Profile, AccountActivation, GetAllUser, UpdateUser, UpdateUserProfilePassword, UpdateUserProfile } from '../controllers/UserController.js';
import IsAdminLoggedIn from '../util/IsAdminLoggedIn.js';
import IsUserLoggedIn from '../util/IsUserLoggedIn.js';
const routes = express.Router();

routes.post("/", SaveUser);

routes.get("/deleteall", DeleteAll);

routes.get("/profile", Profile)

routes.get("/countuser", IsAdminLoggedIn, CountUser)

routes.get("/allusers", IsAdminLoggedIn, GetAllUser)
routes.put("/updateprofile/:id", IsAdminLoggedIn, UpdateUser)
routes.put("/editprofile", IsUserLoggedIn, UpdateUserProfile)
routes.put("/changepassword", IsUserLoggedIn, UpdateUserProfilePassword)
routes.put("/uploadimage", IsUserLoggedIn, UploadProfilePic)
routes.get("/account-activation/:x", AccountActivation)







export default routes;