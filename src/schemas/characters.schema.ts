import Joi from "joi";

export const characterSchema = Joi.object({
	name: Joi.string().max(50).required(),
	description: Joi.string().required(),
	history: Joi.string().required(),
	skills: Joi.array().min(1).items(Joi.string()).required(),
});
