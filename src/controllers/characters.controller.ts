import { Request, Response } from "express";
import * as reponseHelper from "../helpers/reponse.helper.js";
import * as charactersService from "../services/characters.services.js";

async function listCharacters(req: Request, res: Response) {
	try {
		const characters = await charactersService.listCharacters();

		return reponseHelper.OK(res, characters);
	} catch (error) {
		return reponseHelper.SERVER_ERROR(res, error);
	}
}

export {listCharacters}