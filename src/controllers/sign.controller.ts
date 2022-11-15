import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../protocols/User.js";
import * as statusCode from "../enums/status.code.enum.js";
import * as signService from "../services/sign.services.js";

async function signup(req: Request, res: Response) {
	const { username, password } = req.body as User;

	try {
		const userWithUsername = await signService.findUserByUsername(username);

		if (userWithUsername) {
			return statusCode.CONFLICT(res, "Usuário já existe.");
		}

		const newPassword = bcrypt.hashSync(password, 13);

		const insertedUser = await signService.createUser({
			username,
			password: newPassword,
		});

		if (!insertedUser.id) {
			return statusCode.BAD_REQUEST(res, "Não foi possível criar usuário.");
		}

		return statusCode.CREATED(res);
	} catch (error) {
		return statusCode.SERVER_ERROR(res, error);
	}
}

export { signup };
