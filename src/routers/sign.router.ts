import { Router } from "express";
import { signup, signin, signout } from "../controllers/sign.controller.js";
import { validateBody } from "../middlewares/validate.body.js";
import { validateToken } from "../middlewares/validate.token.js";
import { signupSchema, signinSchema } from "../schemas/sign.schemas.js";

const router = Router();

router
	.post("/sign-up", validateBody(signupSchema), signup)
	.post("/sign-in", validateBody(signinSchema), signin)
	.post("/sign-out", validateToken, signout);

export default router;
