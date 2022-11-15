import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as reponseHelper from "../helpers/reponse.helper.js";
import * as signService from "../services/sign.services.js";

export async function validateToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token: string = req.headers.authorization?.replace("Bearer ", "");

	try {
		const { user } = jwt.verify(token, process.env.JWT_SECRET) as {
			user: number;
		};

		const session = await signService.findSession(token);

		if (!session || user !== session.user_id) {
			return reponseHelper.UNAUTHORIZED(res);
		}

		res.locals.user = user;
		res.locals.session = session.id;

		next();
	} catch (error) {
		return reponseHelper.UNAUTHORIZED(res);
	}
}
