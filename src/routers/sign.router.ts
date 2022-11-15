import { Router } from "express";
import { signup, signin } from "../controllers/sign.controller.js";
import { validateBody } from "../middlewares/validate.body.js";
import { signupSchema, signinSchema } from "../schemas/sign.schemas.js";

const router = Router();

router
	.post("/sign-up", validateBody(signupSchema), signup)
	.post("/sign-in", validateBody(signinSchema), signin);

export default router;
