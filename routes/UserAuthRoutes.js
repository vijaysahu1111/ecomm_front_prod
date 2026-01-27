import express from 'express'
import { Auth, CheckEmail, ForgotPassword, CheckOTP, ChangePasswordByOTP } from '../controllers/UserAuthController.js';
const routes = express.Router();

routes.post("/", Auth)
routes.get("/checkemail/:e", CheckEmail)
routes.post("/forgotpass", ForgotPassword)
routes.post("/check-otp", CheckOTP)
routes.put("/confirm-password", ChangePasswordByOTP)

export default routes;