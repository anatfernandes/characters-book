import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../protocols/User.js";
import * as reponseHelper from "../helpers/reponse.helper.js";
import * as signService from "../services/sign.services.js";

async function signup(req: Request, res: Response) {
	const { username, password } = req.body as User;

	try {
		const userWithUsername = await signService.findUserByUsername(username);

		if (userWithUsername) {
			return reponseHelper.CONFLICT(res, "Usuário já existe.");
		}

		const newPassword = bcrypt.hashSync(password, 13);

		const wasSuccessful = await signService.createUser({
			username,
			password: newPassword,
		});

		if (!wasSuccessful) {
			return reponseHelper.BAD_REQUEST(res, "Não foi possível criar usuário.");
		}

		return reponseHelper.CREATED(res);
	} catch (error) {
		return reponseHelper.SERVER_ERROR(res, error);
	}
}

async function signin(req: Request, res: Response) {
	const { username, password } = req.body as User;

	try {
		const user = await signService.findUserByUsername(username);

		if (!user || !bcrypt.compareSync(password, user.password)) {
			return reponseHelper.BAD_REQUEST(
				res,
				"Nome de usuário ou senha inválidos."
			);
		}

		const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET);

		const wasSuccessful = await signService.createSession(username, token);

		if (!wasSuccessful) {
			return reponseHelper.BAD_REQUEST(res, "Não foi possível iniciar sessão.");
		}

		return reponseHelper.OK(res, { token });
	} catch (error) {
		return reponseHelper.SERVER_ERROR(res, error);
	}
}

async function signout(req: Request, res: Response) {
	const { session } = res.locals;

	try {
		const wasSuccessful = await signService.finishSession(session);

		if (!wasSuccessful) {
			return reponseHelper.BAD_REQUEST(
				res,
				"Não foi possível finalizar sessão."
			);
		}

		return reponseHelper.OK(res);
	} catch (error) {
		return reponseHelper.SERVER_ERROR(res, error);
	}
}

export { signup, signin, signout };
