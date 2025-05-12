
import { Router } from "express"
import { authentication, login, logout, signup } from "../handlers/auth.js";


export const authRoute = Router();

authRoute.get("/", authentication)
//restaurant account auth
authRoute.post("/login", login)
authRoute.post("/logout", logout)
authRoute.post("/signup", signup)
