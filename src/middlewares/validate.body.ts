import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import * as statusCode from "../enums/status.code.enum.js";

export function validateBody(schema: Joi.ObjectSchema<any>) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req.body, { abortEarly: false });

		if (validation.error) {
			const errors = validation.error.details.map(({ message }) => message);

			return statusCode.BAD_REQUEST(res, errors);
		}

		next();
	};
}
