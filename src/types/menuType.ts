import type { Url } from "next/dist/shared/lib/router/router";
export type MenuItem = {
	id: number;
	title?: string;
	label: string;
	link: Url;
	visible?: boolean;
	exact?: boolean;
};
