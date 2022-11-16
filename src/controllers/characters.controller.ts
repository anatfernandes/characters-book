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
		const hasCharacter = await charactersService.findCharacterByName(
			req.body.name
		);

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

async function deleteCharacter(req: Request, res: Response) {
	const user = res.locals.user;
	const id: number | null = Number(req.params.id) || null;

	if (!id) return reponseHelper.BAD_REQUEST(res);

	try {
		const character = await charactersService.findCharacterById(id);

		if (!character) {
			return reponseHelper.NOT_FOUND(res);
		}

		if (character.by !== user) {
			return reponseHelper.UNAUTHORIZED(res);
		}

		const wasSuccessful = await charactersService.deleteCharacter(id);

		if (!wasSuccessful) {
			return reponseHelper.BAD_REQUEST(
				res,
				"Não foi possível apagar personagem."
			);
		}

		return reponseHelper.NO_CONTENT(res);
	} catch (error) {
		return reponseHelper.SERVER_ERROR(res, error);
	}
}

async function editCharacter(req: Request, res: Response) {
	const user = res.locals.user;
	const id: number | null = Number(req.params.id) || null;

	if (!id) return reponseHelper.BAD_REQUEST(res);

	try {
		const character = await charactersService.findCharacterById(id);

		if (!character) {
			return reponseHelper.NOT_FOUND(res);
		}

		if (character.by !== user) {
			return reponseHelper.UNAUTHORIZED(res);
		}

		const characterWithName = await charactersService.findCharacterByName(
			req.body.name
		);

		if (characterWithName) {
			return reponseHelper.CONFLICT(
				res,
				`Já existe um personagem chamado ${req.body.name}.`
			);
		}

		const wasSuccessful = await charactersService.editCharacter(
			req.body,
			req.body.skills,
			id
		);

		if (!wasSuccessful) {
			return reponseHelper.BAD_REQUEST(
				res,
				"Não foi possível editar personagem."
			);
		}

		return reponseHelper.NO_CONTENT(res);
	} catch (error) {
		return reponseHelper.SERVER_ERROR(res, error);
	}
}

export { listCharacters, createCharacter, deleteCharacter, editCharacter };
