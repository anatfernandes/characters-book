import { Router } from "express";
import { listCharacters } from "../controllers/characters.controller.js";

const router = Router();

router.get("/", listCharacters);

export default router;
