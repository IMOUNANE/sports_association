import React from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
export default function Header() {
	let user = null;
	const route = useRouter();
	const userCookie = getCookie("user");
	if (userCookie) {
		user = JSON.parse(userCookie);
	}
	const logout = () => {
		deleteCookie("token");
		deleteCookie("user");
		route.push("/");
	};
	return (
		<header className="border border-solid border-black flex justify-between">
			<h1>
				Bienvenue {user?.firstname} {user?.lastname}
			</h1>
			<Button className=" hover:bg-black py-2 px-4 rounded-md" onClick={logout}>
				Se déconnecter
			</Button>
		</header>
	);
}
