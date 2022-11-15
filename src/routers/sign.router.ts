import { Router } from "express";
import { signup } from "../controllers/sign.controller.js";
import { validateBody } from "../middlewares/validate.body.js";
import { signupSchema } from "../schemas/sign.schemas.js";

const router = Router();

router.post("/sign-up", validateBody(signupSchema), signup);

export default router;
