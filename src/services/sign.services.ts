import { User, UserEntity } from "../protocols/User.js";
import * as signRepository from "../repositories/sign.repository.js";

function createUser(user: User): Promise<UserEntity> {
	return signRepository.createUser(user);
}

function findUserByUsername(username: string): Promise<UserEntity | null> {
	return signRepository.findUserByUsername(username);
}

export { createUser, findUserByUsername };
