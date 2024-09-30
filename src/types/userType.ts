
export type User = {
	id?: number;
	firstname?: string | null;
	lastname?: string | null;
	email?: string;
	password?: string;
    confirmPassword?: string;
    contribution?: Date | null
};
