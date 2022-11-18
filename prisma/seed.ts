import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const inserted = await prisma.users.upsert({
		where: { username: "queijodemaçã" },
		update: {},
		create: {
			username: "queijodemaçã",
			password: "$2b$13$YzFHY3oPIjWH2NP4yzX.V.ccnqk95zBTVvoeeqiiz78yBhqW1v2qS",
			characters: {
				create: {
					name: "Rosa Martinez",
					description: `Pequena mulher cujos olhos safira espanta a todos. Sua curiosidade e inteligência frequentemente a coloca em problemas.`,
					history: `Embora nascida na Colômbia, cresceu em Nova Iorque, onde sofria constantemente de bullying na escola, não só de seus colegas, mas também dos docentes. Teve uma adolescência solitária nas livrarias locais. Após muito trabalhando como atentende em uma mercearia, conseguiu guardar dinheiro suficiente para investir na formação de seus sonhos: culinária. Hoje trabalha dentro de uma das cozinhas mais reconhecidas de Los Angeles.`,
					characters_skills: {
						create: {
							skills: {
								create: {
									name: "culinária",
								},
							},
						},
					},
				},
			},
		},
		include: {
			characters: true,
		},
	});

	console.log({ inserted });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
