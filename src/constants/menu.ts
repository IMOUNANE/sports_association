import type { MenuItem } from "@/types/menuType";

export const MENU_NAVIGATION: MenuItem[] = [
	{
        id: 0,
		label: "Tableau de bord",
		link: "/dashboard",
		exact: true,
		visible: true,
	},
	{
        id: 1,
		label: "Cours",
		link: "/courses",
		exact: true,
		visible: true,
	},
	{
        id: 2,
		label: "Paramètre",
		link: "/parameters",
		exact: true,
		visible: true,
	},
];
