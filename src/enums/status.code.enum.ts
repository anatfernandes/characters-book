import { Response } from "express";

export function OK(res: Response, message: string = "ok") {
	return res.status(200).send({ message });
}

export function CREATED(res: Response, message: string = "created") {
	return res.status(201).send({ message });
}

export function NO_CONTENT(res: Response, message: string = "no content") {
	return res.status(204).send({ message });
}

export function BAD_REQUEST(
	res: Response,
	message: string | string[] = "bad request"
) {
	return res.status(400).send({ message });
}

export function UNAUTHORIZED(res: Response, message: string = "unauthorized") {
	return res.status(401).send({ message });
}

export function UNPROCESSABLE_ENTITY(
	res: Response,
	message: string = "unprocessable entity"
) {
	return res.status(422).send({ message });
}

export function CONFLICT(res: Response, message: string = "conflict") {
	return res.status(409).send({ message });
}

export function SERVER_ERROR(
	res: Response,
	error: string,
	message: string = "server error"
) {
	console.log(error);
	return res.status(500).send({ message });
}
