import { Router } from "express";
import authRouter from "@/features/auth/routers";
import customerRouter from "@/features/customer/routes";
import authGuard from "@/guards/auth.guard";

const routes = Router();

routes.use(authRouter);
routes.use("/customers", authGuard, customerRouter);

export default routes;
