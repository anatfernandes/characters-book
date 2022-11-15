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

function finishSession(session: number) {
	return prisma.sessions.update({
		where: { id: session },
		data: { active: false },
	});
}

function findSession(token: string) {
	return prisma.sessions.findFirst({
		where: { token, active: true },
	});
}

export {
	createUser,
	findUserByUsername,
	createSession,
	finishSession,
	findSession,
};
