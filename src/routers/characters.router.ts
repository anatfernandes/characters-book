import { Router } from "express";
import { createCharacter, listCharacters } from "../controllers/characters.controller.js";
import { validateBody } from "../middlewares/validate.body.js";
import { validateToken } from "../middlewares/validate.token.js";
import { characterSchema } from "../schemas/characters.schema.js";

const router = Router();

router
	.get("/", listCharacters)
	.all("/*", validateToken)
	.post("/", validateBody(characterSchema), createCharacter);

export default router;
