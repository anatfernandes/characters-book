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

async function createCharacter(req: Request, res: Response) {
	const user = res.locals.user;

	try {
		const hasCharacter = await charactersService.findCharacter(req.body.name);

		if (hasCharacter) {
			return reponseHelper.CONFLICT(
				res,
				`Já existe um personagem chamado ${req.body.name}.`
			);
		}

		const wasSuccessful = await charactersService.createCharacter(
			req.body,
			req.body.skills,
			user
		);

		if (!wasSuccessful) {
			return reponseHelper.BAD_REQUEST(
				res,
				"Não foi possível criar personagem."
			);
		}

		return reponseHelper.CREATED(res);
	} catch (error) {
		return reponseHelper.SERVER_ERROR(res, error);
	}
}

export { listCharacters, createCharacter };
