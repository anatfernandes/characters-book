import prisma from "../database/database.js";
import { NewCharacter } from "../protocols/Character.js";
import { CharacterQuery } from "../protocols/Query.js";

function listCharacters(query: CharacterQuery) {
	return prisma.characters.findMany({
		where: {
			name: { startsWith: query.name, mode: "insensitive" },
			users: {
				username: {
					startsWith: query.by,
					mode: "insensitive",
				},
			},
			characters_skills: {
				some: {
					skills: {
						name: {
							startsWith: query.skill,
							mode: "insensitive",
						},
					},
				},
			},
		},
		include: {
			users: {
				select: {
					username: true,
				},
			},
			characters_skills: {
				select: {
					skills: {
						select: {
							name: true,
						},
					},
				},
			},
		},
		orderBy: { id: "asc" },
	});
}

function findCharacterByName(name: string, id?: number) {
	return prisma.characters.findFirst({
		where: { OR: { name }, NOT: { id: id || 0 } },
	});
}

function findCharacterById(id: number) {
	return prisma.characters.findUnique({
		where: { id },
	});
}

async function createSkills(skills: { name: string }[], character: number) {
	for (let i = 0; i < skills.length; i++) {
		await prisma.skills.upsert({
			where: skills[i],
			update: {
				characters_skills: { create: { character_id: character } },
			},
			create: {
				name: skills[i].name,
				characters_skills: { create: { character_id: character } },
			},
		});
	}

	return {};
}

async function deleteCharacterSkills(id: number) {
	return prisma.characters_skills.deleteMany({
		where: { character_id: id },
	});
}

async function deleteCharacter(id: number) {
	await deleteCharacterSkills(id);

	return prisma.characters.delete({
		where: { id },
	});
}

async function upsertCharacter(
	{ name, description, history, by, skills }: NewCharacter,
	characterId: number
) {
	const character = await prisma.characters.upsert({
		where: { id: characterId || 0 },
		create: {
			name,
			description,
			history,
			by,
		},
		update: { name, description, history, edited_at: new Date() },
	});

	if (characterId && character.id) {
		await deleteCharacterSkills(characterId);

		return createSkills(skills, characterId);
	}

	if (character.id) {
		return createSkills(skills, character.id);
	}

	return null;
}

export {
	listCharacters,
	findCharacterByName,
	findCharacterById,
	deleteCharacter,
	upsertCharacter,
};
