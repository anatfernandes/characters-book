import { SessionEntity } from "../protocols/Session.js";
import { User, UserEntity } from "../protocols/User.js";
import * as signRepository from "../repositories/sign.repository.js";

async function createUser(user: User): Promise<boolean> {
	const insertedUser = await signRepository.createUser(user);

	return !!insertedUser;
}

function findUserByUsername(username: string): Promise<UserEntity | null> {
	return signRepository.findUserByUsername(username);
}

async function createSession(
	username: string,
	token: string
): Promise<boolean> {
	const insertedSession: SessionEntity = await signRepository.createSession(
		username,
		token
	);

	return !!insertedSession;
}

export { createUser, findUserByUsername, createSession };
