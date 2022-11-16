import { Router } from "express";
import { validateBody } from "../middlewares/validate.body.js";
import { validateToken } from "../middlewares/validate.token.js";
import { characterSchema } from "../schemas/characters.schema.js";
import {
	createCharacter,
	listCharacters,
	deleteCharacter,
	editCharacter,
} from "../controllers/characters.controller.js";

const router = Router();

router
	.get("/", listCharacters)
	.all("/*", validateToken)
	.post("/", validateBody(characterSchema), createCharacter)
	.put("/:id", validateBody(characterSchema), editCharacter)
	.delete("/:id", deleteCharacter);

export default router;
