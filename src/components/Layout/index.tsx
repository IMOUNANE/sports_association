import type React from "react";
import Header from "./Header";
import Menu from "./Menu";
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<Menu />
			{children}
		</>
	);
}
