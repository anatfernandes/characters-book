import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import * as reponseHelper from "../helpers/reponse.helper.js";

export function validateBody(schema: Joi.ObjectSchema<any>) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req.body, { abortEarly: false });

		if (validation.error) {
			const errors = validation.error.details.map(({ message }) => message);

			return reponseHelper.BAD_REQUEST(res, errors);
		}

		next();
	};
}
