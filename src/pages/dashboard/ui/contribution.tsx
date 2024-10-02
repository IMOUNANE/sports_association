import React from "react";
import { format } from "date-fns";

export default function Contribution({
	contribution,
}: { contribution: Date | null }) {
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-fit flex flex-col gap-5">
			<h1>Informations personnelles</h1>
			{contribution ? (
				<div>
					<p>Votre réglement de cotisations s'élève à x et se termine le :</p>
					<b>
						{contribution && format(contribution?.split("T")[0], "d MMMM yyyy")}
					</b>
				</div>
			) : (
				<div>Vous n'avez pas de contribution à ce jour</div>
			)}
		</div>
	);
}
