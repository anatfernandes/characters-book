import { Router } from "express";
import signRouter from "./sign.router.js";
import charactersRouter from "./characters.router.js";

const router = Router();

router.use("/auth", signRouter).use("/characters", charactersRouter);

export default router;
