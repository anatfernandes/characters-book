import { CharacterQuery } from "../protocols/Query.js";
import * as charactersRepository from "../repositories/characters.repository.js";
import {
	Character,
	CharacterEntity,
	NewCharacter,
} from "../protocols/Character.js";

async function listCharacters(query: CharacterQuery): Promise<Character[]> {
	const characters = await charactersRepository.listCharacters(query);

	const charactersFormated = characters.map((character) => ({
		id: character.id,
		name: character.name,
		description: character.description,
		history: character.history,
		by: character.users.username,
		skills: character.characters_skills.map(({ skills }) => skills.name),
		createdAt: character.created_at,
		editedAt: character.edited_at,
	}));

	return charactersFormated;
}

async function findCharacterByName(
	name: string,
	id?: number
): Promise<boolean> {
	const character = await charactersRepository.findCharacterByName(name, id);

	return !!character;
}

function findCharacterById(id: number): Promise<CharacterEntity> {
	return charactersRepository.findCharacterById(id);
}

async function deleteCharacter(id: number): Promise<boolean> {
	const deletedCharacter = await charactersRepository.deleteCharacter(id);

	return !!deletedCharacter;
}

async function upsertCharacter({
	data,
	skills,
	characterId,
	user,
}: NewCharacterData): Promise<boolean> {
	data.skills = skills.map((skill) => ({ name: skill.toLowerCase().trim() }));
	data.by = user;

	const character = await charactersRepository.upsertCharacter(
		data,
		characterId
	);

	return !!character;
}

type NewCharacterData = {
	data: NewCharacter;
	skills: string[];
	characterId?: number;
	user: number;
};

export {
	listCharacters,
	findCharacterByName,
	findCharacterById,
	deleteCharacter,
	upsertCharacter,
};
