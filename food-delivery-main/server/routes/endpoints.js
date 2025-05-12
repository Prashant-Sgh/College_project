import { Router } from "express";
import { authRoute } from "./auth.js";
import { productRoute } from "./product.js";
import restaurantRoute from "./restaurant.js";

export const apiRoutes = Router();
apiRoutes.use("/auth", authRoute);
apiRoutes.use("/product", productRoute);
apiRoutes.use("/restaurant", restaurantRoute);