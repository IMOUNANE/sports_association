import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export default function Contribution({
	contribution,
}: { contribution: Date | null }) {
	const [daysDifference, setDaysDifference] = useState(0);
	const calculateDaysDifference = (date: Date) => {
		const today = new Date();
		const formatedDate = new Date(
			format(contribution?.split("T")[0], "d MMMM yyyy"),
		);

		const timeDiff = formatedDate.getTime() - today.getTime();
		const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return dayDiff;
	};

	const handleDateChange = (date?: Date) => {
		if (date) {
			setDaysDifference(calculateDaysDifference(date));
		}
	};

	useEffect(() => {
		if (contribution) {
			handleDateChange(contribution);
		}
	}, [contribution]);
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-fit flex flex-col gap-5">
			<h1>Informations personnelles</h1>
			{contribution ? (
				<div>
					<p>
						Votre réglement de cotisations s'élève à{" "}
						{daysDifference > 0 ? daysDifference * 1 : 1} € et se termine le :
					</p>
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
