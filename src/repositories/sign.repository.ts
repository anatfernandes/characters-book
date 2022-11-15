import prisma from "../database/database.js";
import { User } from "../protocols/User.js";

function createUser({ username, password }: User) {
	return prisma.users.create({ data: { username, password } });
}

function findUserByUsername(username: string) {
	return prisma.users.findFirst({
		where: {
			username,
		},
	});
}

export { createUser, findUserByUsername };
