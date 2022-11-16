import prisma from "../database/database.js";
import { NewCharacter } from "../protocols/Character.js";

function listCharacters() {
	return prisma.characters.findMany({
		orderBy: { id: "asc" },
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
	});
}

function findCharacter(name: string) {
	return prisma.characters.findUnique({
		where: { name },
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

async function createCharacter({
	name,
	description,
	history,
	by,
	skills,
}: NewCharacter) {
	const insertedCharacter = await prisma.characters.create({
		data: {
			name,
			description,
			history,
			by,
		},
	});

	if (insertedCharacter.id) {
		return createSkills(skills, insertedCharacter.id);
	}

	return null;
}

export { listCharacters, createCharacter, findCharacter };
