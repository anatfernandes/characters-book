import Joi from "joi";

export const signupSchema = Joi.object({
	username: Joi.string().max(50).required(),
	password: Joi.string().required(),
	confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});
