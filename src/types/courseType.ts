
export type Course = {
	id?: number;
	title?: string | null;
    owner?: number |null;
	description?: string | null;
	status?: boolean | null;
	location?: string;
	createdAt?: Date;
};
