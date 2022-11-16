export type CharacterEntity = {
	id: number;
	name: string;
	description: string;
	history: string;
	by: string;
	skills: string[];
	createdAt: Date;
	editedAt: Date;
};

export type NewCharacter = Omit<
	CharacterEntity,
	"id" | "createdAt" | "editedAt"
>;
