import prisma from "../database/database.js";
import { User } from "../protocols/User.js";

function createUser({ username, password }: User) {
	return prisma.users.create({ data: { username, password } });
}

function findUserByUsername(username: string) {
	return prisma.users.findUnique({
		where: {
			username,
		},
	});
}

function createSession(username: string, token: string) {
	return prisma.sessions.create({
		data: { token, users: { connect: { username } } },
	});
}

export { createUser, findUserByUsername, createSession };
