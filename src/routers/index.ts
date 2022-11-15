import { Router } from "express";
import signRouter from "./sign.router.js";

const router = Router();

router.use("/auth", signRouter);

export default router;
