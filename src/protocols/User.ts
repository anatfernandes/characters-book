export type NewUser = {
	username: string;
	password: string;
	confirmPassword: string;
};

export type User = Omit<NewUser, "confirmPassword">;

export type UserEntity = {
	id: number;
	username: string;
};
