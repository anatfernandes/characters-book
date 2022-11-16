export type CharacterEntity = {
	id: number;
	name: string;
	description: string;
	history: string;
	by: number;
	created_at: Date;
	edited_at: Date;
};

export type Character = Omit<
	CharacterEntity,
	"id" | "created_at" | "edited_at" | "by"
> & {
	skills: string[];
	by: string;
	createdAt: Date;
	editedAt: Date;
};

export type NewCharacter = Omit<
	CharacterEntity,
	"id" | "createdAt" | "editedAt" | "by" | "skills"
> & {
	by: number;
	skills: { name: string }[];
};
