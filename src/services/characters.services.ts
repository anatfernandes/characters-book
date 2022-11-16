import { CharacterEntity } from "../protocols/Character.js";
import * as charactersRepository from "../repositories/characters.repository.js";

async function listCharacters(): Promise<CharacterEntity[]> {
	const characters = await charactersRepository.listCharacters();

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

export { listCharacters };
