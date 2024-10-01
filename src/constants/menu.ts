import type { MenuItem } from "@/types/menuType";

export const MENU_NAVIGATION: MenuItem[] = [
	{
        id: 0,
		icon: "icon-[jam--clipboard]",
		activeIcon: "icon-[jam--clipboard-f]",
		label: "Tableau de bord",
		link: "/dashboard",
		exact: true,
		visible: true,
	},
	{
        id: 1,
		icon: "icon-[jam--clipboard]",
		activeIcon: "icon-[jam--clipboard-f]",
		label: "Cours",
		link: "/courses",
		exact: true,
		visible: true,
	},
	{
        id: 2,
		icon: "icon-[jam--clipboard]",
		activeIcon: "icon-[jam--clipboard-f]",
		label: "Paramètre",
		link: "/parameters",
		exact: true,
		visible: true,
	},
];
