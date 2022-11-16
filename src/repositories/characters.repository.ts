import prisma from "../database/database.js";

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

export { listCharacters };
