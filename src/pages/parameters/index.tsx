import React, { useState } from "react";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { getCookie } from "cookies-next";
import { setCookie } from "@/utils/Cookies";
export default function Parameters() {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [daysDifference, setDaysDifference] = useState(0);

	const calculateDaysDifference = (date: Date) => {
		const today = new Date();
		const timeDiff = date.getTime() - today.getTime();
		const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return dayDiff;
	};

	const handleDateChange = (date?: Date) => {
		if (date) {
			setSelectedDate(date);
			setDaysDifference(calculateDaysDifference(date));
		}
	};
	const handleSubmit = async () => {
		const errorMessage = "Une erreur s'est produite";

		try {
			const userCookie = getCookie("user");
			if (userCookie) {
				const user = JSON.parse(userCookie);

				const res = await fetch("/api/contribution", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${getCookie("token")}`,
					},
					body: JSON.stringify({ id: user?.id, contribution: selectedDate }),
				});
				if (res.status === 500) {
					toast.error(errorMessage);
				} else {
					setCookie("user", JSON.stringify(user));
					toast("Paiement effectué avec succès");
				}
			}
		} catch {
			toast.error(errorMessage);
		}
	};

	return (
		<main>
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-5">
				<h1>Réglement de la contribution</h1>
				<h2>Choisissez une date</h2>
				<DatePicker
					onChange={(date) => {
						handleDateChange(date);
					}}
				/>
				{selectedDate && (
					<div className="mt-2">
						<p>Date sélectionnée : {selectedDate.toLocaleDateString()}</p>
						<p>
							Prix d'abonnement : {daysDifference > 0 ? daysDifference * 1 : 1}{" "}
							€ (1 euro/jour)
						</p>
					</div>
				)}
				<div className="flex justify-end">
					<Toaster />
					<Button onClick={handleSubmit}>
						{" "}
						Payer {daysDifference > 0 ? daysDifference * 1 : 1} €{" "}
					</Button>
				</div>
			</div>
		</main>
	);
}
